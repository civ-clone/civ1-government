import { Anarchy, Despotism, Monarchy } from '../Governments';
import {
  REVOLUTION,
  pendingRevolution as rulesetPendingRevolution,
} from '../lib/revolution';
import { ChooseGovernment } from '../PlayerActions';
import { Game } from '@civ-clone/core-game/Game';
import Player from '@civ-clone/core-player/Player';
import RevolutionTerms from '@civ-clone/base-government-change/Rules/RevolutionTerms';
import { expect } from 'chai';
import register from '../registerRules';
import { revolution } from '@civ-clone/base-government-change/lib/revolution';
import { revolutionTerms } from '@civ-clone/base-government-change/lib/terms';

describe('RevolutionTerms', (): void => {
  it('names this package’s save key and Anarchy, once', (): void => {
    const game = new Game();

    register(game);

    expect(game.rules.get(RevolutionTerms)).to.have.length(1);
    expect(revolutionTerms(game.rules)).to.deep.equal({
      key: REVOLUTION,
      Interim: Anarchy,
    });
  });

  it('starts, from outside this package, a revolution this package offers the choice for', (): void => {
    const game = new Game();

    game.availableGovernments.register(Anarchy, Despotism, Monarchy);

    register(game);

    // The package's `Added` rule gives the player its government, in Despotism.
    const player = new Player(game.rules),
      playerGovernment = game.playerGovernments.getByPlayer(player),
      { key, Interim } = revolutionTerms(game.rules)!;

    expect(playerGovernment.is(Despotism)).true;

    revolution(
      key,
      Interim,
      playerGovernment,
      game.pendingEffects,
      game.rules,
      game.turn,
      'chosen'
    );

    expect(playerGovernment.is(Anarchy)).true;
    expect(rulesetPendingRevolution(playerGovernment, game.pendingEffects)).not
      .null;

    for (
      let turns = 0;
      turns < 10 &&
      !player
        .actions()
        .some((action): boolean => action instanceof ChooseGovernment);
      turns++
    ) {
      game.turn.increment();
    }

    expect(
      player
        .actions()
        .some((action): boolean => action instanceof ChooseGovernment)
    ).true;
  });
});
