import {
  Anarchy,
  Communism,
  Democracy,
  Despotism,
  Monarchy,
  Republic,
} from '../Governments';
import { ChooseGovernment, Revolution } from '../PlayerActions';
import {
  REVOLUTION,
  RevolutionError,
  chooseGovernment,
  pendingRevolution,
  revolution,
  turnsUntilChoice,
} from '../lib/revolution';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import AnarchyDuration from '../Rules/AnarchyDuration';
import Effect from '@civ-clone/core-rule/Effect';
import { Game } from '@civ-clone/core-game/Game';
import { Monarchy as MonarchyAdvance } from '@civ-clone/library-science/Advances';
import Player from '@civ-clone/core-player/Player';
import PlayerAction from '@civ-clone/core-player/PlayerAction';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import action from '../Rules/Player/action';
import anarchyDuration from '../Rules/Player/anarchy-duration';
import availability from '../Rules/Governments/availability';
import { expect } from 'chai';
import { gameForLoad } from '@civ-clone/core-save-game/gameForLoad';
import { hydrate } from '@civ-clone/core-save-game/hydrate';
import { registerClasses } from '@civ-clone/core-save-game/registerClasses';
import { save } from '@civ-clone/core-save-game/save';

const setUp = (randomNumberGenerator: () => number = () => 0) => {
  const game = new Game();

  game.availableGovernments.register(
    Anarchy,
    Communism,
    Democracy,
    Despotism,
    Monarchy,
    Republic
  );

  game.rules.register(
    ...action(game.playerGovernments, game.pendingEffects, game.turn),
    ...anarchyDuration(randomNumberGenerator),
    ...availability(game.playerResearch)
  );

  const player = new Player(game.rules),
    playerResearch = new PlayerResearch(
      player,
      new AdvanceRegistry(),
      game.rules
    ),
    playerGovernment = new PlayerGovernment(
      player,
      game.availableGovernments,
      game.rules
    );

  playerGovernment.set(new Despotism());
  game.playerResearch.register(playerResearch);
  game.playerGovernments.register(playerGovernment);

  const actions = (): PlayerAction[] => player.actions();

  return { actions, game, player, playerGovernment, playerResearch };
};

describe('Revolution', (): void => {
  it('should last one to four turns', (): void => {
    const durations = [0, 0.25, 0.5, 0.75, 0.999].map((value) => {
      const { game, playerGovernment } = setUp(() => value);

      revolution(playerGovernment, game.pendingEffects, game.rules, game.turn);

      return turnsUntilChoice(playerGovernment, game.pendingEffects, game.turn);
    });

    expect(durations).to.deep.equal([1, 2, 3, 4, 4]);
  });

  it('should last two to eight turns when civil disorder causes it', (): void => {
    const durations = [0, 0.5, 0.999].map((value) => {
      const { game, playerGovernment } = setUp(() => value);

      revolution(
        playerGovernment,
        game.pendingEffects,
        game.rules,
        game.turn,
        'civil-disorder'
      );

      return turnsUntilChoice(playerGovernment, game.pendingEffects, game.turn);
    });

    expect(durations).to.deep.equal([2, 5, 8]);
  });

  it('should skip Anarchy after civil disorder when a rule says it lasts no turns', (): void => {
    const { actions, game, playerGovernment } = setUp(() => 0.999);

    game.rules.register(new AnarchyDuration(new Effect((): number => 0)));

    revolution(
      playerGovernment,
      game.pendingEffects,
      game.rules,
      game.turn,
      'civil-disorder'
    );

    expect(playerGovernment.is(Despotism)).true;
    expect(actions().some((action) => action instanceof ChooseGovernment)).true;
  });

  it('should put the player into Anarchy and withdraw Revolution', (): void => {
    const { actions, game, playerGovernment } = setUp();

    expect(actions().some((action) => action instanceof Revolution)).true;

    revolution(playerGovernment, game.pendingEffects, game.rules, game.turn);

    expect(playerGovernment.is(Anarchy)).true;
    expect(actions().some((action) => action instanceof Revolution)).false;
    expect(() =>
      revolution(playerGovernment, game.pendingEffects, game.rules, game.turn)
    ).to.throw(RevolutionError);
  });

  it('should offer ChooseGovernment only once Anarchy is over', (): void => {
    const { actions, game, player, playerGovernment } = setUp(() => 0.5);

    revolution(playerGovernment, game.pendingEffects, game.rules, game.turn);

    const offered = (): boolean =>
      actions().some((action) => action instanceof ChooseGovernment);

    expect(offered()).false;
    expect(() =>
      chooseGovernment(
        playerGovernment,
        Despotism,
        game.pendingEffects,
        game.turn
      )
    ).to.throw(RevolutionError);

    game.turn.increment();
    game.turn.increment();

    expect(offered()).false;

    game.turn.increment();

    expect(offered()).true;
    expect(player.hasMandatoryActions()).true;
  });

  it('should set the chosen government and finish the revolution', (): void => {
    const { actions, game, playerGovernment, playerResearch } = setUp();

    playerResearch.addAdvance(MonarchyAdvance);
    revolution(playerGovernment, game.pendingEffects, game.rules, game.turn);
    game.turn.increment();

    chooseGovernment(
      playerGovernment,
      Monarchy,
      game.pendingEffects,
      game.turn
    );

    expect(playerGovernment.is(Monarchy)).true;
    expect(pendingRevolution(playerGovernment, game.pendingEffects)).null;
    expect(actions().some((action) => action instanceof ChooseGovernment))
      .false;
    expect(actions().some((action) => action instanceof Revolution)).true;
  });

  it('should refuse a government that is not available', (): void => {
    const { game, playerGovernment } = setUp();

    revolution(playerGovernment, game.pendingEffects, game.rules, game.turn);
    game.turn.increment();

    expect(() =>
      chooseGovernment(
        playerGovernment,
        Monarchy,
        game.pendingEffects,
        game.turn
      )
    ).to.throw(RevolutionError);
    expect(() =>
      chooseGovernment(
        playerGovernment,
        Anarchy,
        game.pendingEffects,
        game.turn
      )
    ).to.throw(RevolutionError);
    expect(playerGovernment.is(Anarchy)).true;
  });

  it('should skip Anarchy when a rule says it lasts no turns', (): void => {
    const { actions, game, playerGovernment } = setUp();

    game.rules.register(new AnarchyDuration(new Effect((): number => 0)));

    revolution(playerGovernment, game.pendingEffects, game.rules, game.turn);

    expect(playerGovernment.is(Despotism)).true;
    expect(actions().some((action) => action instanceof Revolution)).false;
    expect(actions().some((action) => action instanceof ChooseGovernment)).true;
  });

  it('should keep a revolution across a save and load', (): void => {
    const { game, player, playerGovernment } = setUp(() => 0.5);

    revolution(playerGovernment, game.pendingEffects, game.rules, game.turn);
    game.turn.increment();

    game.engine.registerPlugins({ '@civ-clone/civ1-government': '0.1.1' });
    registerClasses(game);

    const loaded = gameForLoad({
      availableGovernments: game.availableGovernments,
      classes: game.classes,
      engine: game.engine,
      rules: new (game.rules.constructor as any)(),
    });

    loaded.rules.register(
      ...action(loaded.playerGovernments, loaded.pendingEffects, loaded.turn),
      ...availability(loaded.playerResearch)
    );

    hydrate(save(game, { name: 'anarchy' }), loaded);

    const [restored] = loaded.playerGovernments
      .entries()
      .filter((candidate) => candidate.player().id() === player.id());

    expect(restored.is(Anarchy)).true;
    expect(
      pendingRevolution(restored, loaded.pendingEffects)?.handler()
    ).to.equal(REVOLUTION);
    expect(
      turnsUntilChoice(restored, loaded.pendingEffects, loaded.turn)
    ).to.equal(2);

    loaded.turn.increment();
    loaded.turn.increment();

    chooseGovernment(restored, Despotism, loaded.pendingEffects, loaded.turn);

    expect(restored.is(Despotism)).true;
    expect(pendingRevolution(restored, loaded.pendingEffects)).null;
  });
});
