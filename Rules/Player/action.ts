import {
  PendingEffectRegistry,
  instance as pendingEffectRegistryInstance,
} from '@civ-clone/core-pending-effect';
import {
  PlayerGovernmentRegistry,
  instance as playerGovernmentRegistryInstance,
} from '@civ-clone/core-government/PlayerGovernmentRegistry';
import { REVOLUTION, registerHandler } from '../../lib/revolution';
import {
  Turn,
  instance as turnInstance,
} from '@civ-clone/core-turn-based-game/Turn';
import {
  choiceDue,
  noRevolutionPending,
  notInInterim,
  offerGovernmentChoice,
  offerRevolution,
} from '@civ-clone/base-government-change/lib/actions';
import Action from '@civ-clone/core-player/Rules/Action';
import { Anarchy } from '../../Governments';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';

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
      new Criterion(notInInterim(Anarchy, playerGovernmentRegistry)),
      // With the Pyramids there's no Anarchy, but the new government still
      // has to be chosen before another revolution.
      new Criterion(
        noRevolutionPending(
          REVOLUTION,
          playerGovernmentRegistry,
          pendingEffects
        )
      ),
      new Effect(offerRevolution(playerGovernmentRegistry))
    ),
    new Action(
      new Criterion(
        choiceDue(REVOLUTION, playerGovernmentRegistry, pendingEffects, turn)
      ),
      new Effect(offerGovernmentChoice(playerGovernmentRegistry))
    ),
  ];
};

export default getRules;
