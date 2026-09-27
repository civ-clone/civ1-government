import { ChooseGovernment, Revolution } from '../../PlayerActions';
import {
  PendingEffectRegistry,
  instance as pendingEffectRegistryInstance,
} from '@civ-clone/core-pending-effect';
import {
  PlayerGovernmentRegistry,
  instance as playerGovernmentRegistryInstance,
} from '@civ-clone/core-government/PlayerGovernmentRegistry';
import {
  Turn,
  instance as turnInstance,
} from '@civ-clone/core-turn-based-game/Turn';
import {
  pendingRevolution,
  registerHandler,
  turnsUntilChoice,
} from '../../lib/revolution';
import Action from '@civ-clone/core-player/Rules/Action';
import { Anarchy } from '../../Governments';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import PlayerAction from '@civ-clone/core-player/PlayerAction';

export const getRules: (
  playerGovernmentRegistry?: PlayerGovernmentRegistry,
  pendingEffects?: PendingEffectRegistry,
  turn?: Turn
) => Action[] = (
  playerGovernmentRegistry: PlayerGovernmentRegistry = playerGovernmentRegistryInstance,
  pendingEffects: PendingEffectRegistry = pendingEffectRegistryInstance,
  turn: Turn = turnInstance
): Action[] => {
  // Here rather than when a revolution starts, so a game loaded mid-Anarchy
  // can still finish it.
  registerHandler(pendingEffects);

  return [
    new Action(
      new Criterion(
        (player: Player): boolean =>
          !playerGovernmentRegistry.getByPlayer(player).is(Anarchy)
      ),
      // With the Pyramids there's no Anarchy, but the new government still
      // has to be chosen before another revolution.
      new Criterion(
        (player: Player): boolean =>
          pendingRevolution(
            playerGovernmentRegistry.getByPlayer(player),
            pendingEffects
          ) === null
      ),
      new Effect((player: Player): PlayerAction[] => [
        new Revolution(player, playerGovernmentRegistry.getByPlayer(player)),
      ])
    ),
    new Action(
      new Criterion(
        (player: Player): boolean =>
          turnsUntilChoice(
            playerGovernmentRegistry.getByPlayer(player),
            pendingEffects,
            turn
          ) === 0
      ),
      new Effect((player: Player): PlayerAction[] => [
        new ChooseGovernment(
          player,
          playerGovernmentRegistry.getByPlayer(player)
        ),
      ])
    ),
  ];
};

export default getRules;
