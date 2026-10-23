import {
  Anarchy,
  Communism,
  Democracy,
  Despotism,
  Monarchy,
  Republic,
} from '../Governments';
import {
  Monarchy as MonarchyAdvance,
  TheRepublic,
} from '@civ-clone/library-science/Advances';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import Availability from '@civ-clone/core-government/Rules/Availability';
import { Game } from '@civ-clone/core-game/Game';
import Player from '@civ-clone/core-player/Player';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import { Requirement } from '@civ-clone/core-requirement/Requirement';
import Rule from '@civ-clone/core-rule/Rule';
import action from '../Rules/Player/action';
import added from '../Rules/Player/added';
import anarchyDuration from '../Rules/Player/anarchy-duration';
import availability from '../Requirements';
import { expect } from 'chai';
import getRules from '../Rules/Governments/availability';
import governmentChanged from '../Rules/Player/government-changed';
import register from '../registerRules';

// Through `register(game)`, as a game gets them: the entries in `game.requirements`, and the rules made from them in
//  `game.rules` under the same ids (civ-clone/web-renderer#37).
const setUp = () => {
  const game = new Game();

  game.availableGovernments.register(
    Anarchy,
    Communism,
    Democracy,
    Despotism,
    Monarchy,
    Republic
  );

  register(game);

  const player = new Player(game.rules),
    research = new PlayerResearch(player, new AdvanceRegistry(), game.rules),
    playerGovernment = new PlayerGovernment(
      player,
      game.availableGovernments,
      game.rules
    );

  game.playerResearch.register(research);

  return { game, playerGovernment, research };
};

const ids = (rules: Rule[]): (string | null)[] =>
  rules.map((rule: Rule): string | null => rule.id());

describe('civ1-government requirements', (): void => {
  it('should make one availability rule for each entry, under its id', (): void => {
    const { game } = setUp();

    availability.forEach((entry: Requirement): void => {
      const rules = game.requirements.rulesFor(entry.id);

      expect(rules, entry.id).length(1);
      expect(rules[0], entry.id).instanceOf(Availability);
      expect(game.rules.getById(entry.id), entry.id).equal(rules[0]);
    });
  });

  it('should have an entry for every availability rule it registers', (): void => {
    const { game } = setUp(),
      availabilityRuleIds = ids(game.rules.get(Availability));

    expect(availabilityRuleIds.length).equal(availability.length);
    availabilityRuleIds.forEach((id: string | null): void => {
      expect(game.requirements.getById(id as string), id as string).not.null;
    });
  });

  it('should register the rules in the order they always were', (): void => {
    const { game } = setUp(),
      before = new Game();

    // The availability rules' ids in the order `Rules/Governments/availability` registered them before they were made
    //  from entries, written out rather than read from the same entries, so a reordered table fails here.
    expect(ids(game.rules.get(Availability))).eql(ids(getRules()));
    expect(ids(getRules())).eql([
      'civ1-government:governments/availability/Despotism',
      'civ1-government:governments/availability/Communism',
      'civ1-government:governments/availability/Democracy',
      'civ1-government:governments/availability/Monarchy',
      'civ1-government:governments/availability/Republic',
    ]);

    // And between the same rules as before: everything `register` used to spread into one call, in that order.
    before.rules.register(
      ...action(before.playerGovernments, before.pendingEffects, before.turn),
      ...added(
        before.availableGovernments,
        before.playerGovernments,
        before.rules
      ),
      ...anarchyDuration(before.rng),
      ...getRules(before.playerResearch),
      ...governmentChanged(before.engine, before.playerWorlds)
    );

    const kinds = (rules: Rule[]): string[] =>
      rules.map(
        (rule: Rule): string => `${rule.constructor.name} ${rule.id()}`
      );

    expect(kinds(game.rules.entries())).eql(kinds(before.rules.entries()));
  });

  it('should read the graph both ways', (): void => {
    const { game } = setUp();

    expect(
      game.requirements
        .for(Republic)
        .map((entry: Requirement): string => entry.id)
    ).eql(['civ1-government:governments/availability/Republic']);
    expect(
      game.requirements
        .leadsTo(TheRepublic)
        .map((entry: Requirement): string => entry.id)
    ).eql(['civ1-government:governments/availability/Republic']);
    expect(
      game.requirements.getById(
        'civ1-government:governments/availability/Despotism'
      )?.targets
    ).eql([]);
  });

  it('should offer governments as the entries say', (): void => {
    const { playerGovernment, research } = setUp();

    // Despotism needs nothing, so it is always available; Anarchy has no entry, so it never is.
    expect(playerGovernment.available()).eql([Despotism]);

    research.addAdvance(TheRepublic);

    expect(playerGovernment.available()).eql([Despotism, Republic]);
  });

  it('should change which governments are offered when a plugin changes an entry', (): void => {
    const { game, playerGovernment, research } = setUp();

    game.requirements.replace(
      'civ1-government:governments/availability/Republic',
      new Requirement({
        id: 'civ1-government:governments/availability/Republic',
        subject: Republic,
        relation: 'requires',
        targets: [TheRepublic, MonarchyAdvance],
      })
    );
    game.requirements.remove(
      'civ1-government:governments/availability/Despotism'
    );

    research.addAdvance(TheRepublic);

    expect(playerGovernment.available()).eql([]);

    research.addAdvance(MonarchyAdvance);

    expect(playerGovernment.available()).eql([Monarchy, Republic]);
  });
});
