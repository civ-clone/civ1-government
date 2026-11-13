import {
  PendingEffect,
  PendingEffectRegistry,
  instance as pendingEffectRegistryInstance,
} from '@civ-clone/core-pending-effect';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  Turn,
  instance as turnInstance,
} from '@civ-clone/core-turn-based-game/Turn';
import {
  applyChosenGovernment,
  chooseGovernment as chooseGovernmentFor,
  pendingRevolution as pendingRevolutionFor,
  registerRevolutionHandler,
  revolution as revolutionFor,
  turnsUntilChoice as turnsUntilChoiceFor,
} from '@civ-clone/base-government-change/lib/revolution';
import { Anarchy } from '../Governments';
import Government from '@civ-clone/core-government/Government';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';
import { RevolutionCause } from '../Rules/AnarchyDuration';

// The revolution itself moved to base-government-change (civ-clone/web-renderer#1008). These keep their signatures and
//  pass it this package's save key and Anarchy.

/**
 * Recorded in the save for a revolution whose new government has not been
 * chosen yet. The target is the `PlayerGovernment`, and `endTurn` is the turn
 * the choice becomes due.
 */
export const REVOLUTION = 'civ1-government:revolution';

export { RevolutionError } from '@civ-clone/base-government-change/lib/revolution';

export { applyChosenGovernment };

/** Registered with the rules, at import, so a revolution loaded from a save can still be finished. */
export const registerHandler = (
  pendingEffects: PendingEffectRegistry = pendingEffectRegistryInstance
): void => registerRevolutionHandler(REVOLUTION, pendingEffects);

export const pendingRevolution = (
  playerGovernment: PlayerGovernment,
  pendingEffects: PendingEffectRegistry = pendingEffectRegistryInstance
): PendingEffect | null =>
  pendingRevolutionFor(REVOLUTION, playerGovernment, pendingEffects);

/** Turns until the new government can be chosen: `0` when it can be chosen now, `null` with no revolution under way. */
export const turnsUntilChoice = (
  playerGovernment: PlayerGovernment,
  pendingEffects: PendingEffectRegistry = pendingEffectRegistryInstance,
  turn: Turn = turnInstance
): number | null =>
  turnsUntilChoiceFor(REVOLUTION, playerGovernment, pendingEffects, turn);

/**
 * Overthrow the current government. The player is in `Anarchy` for as many
 * turns as `AnarchyDuration` allows for the `cause`, then chooses a new
 * government through `ChooseGovernment`. With no Anarchy at all (the
 * Pyramids), the choice is due straight away and the current government stays
 * until it is made.
 */
export const revolution = (
  playerGovernment: PlayerGovernment,
  pendingEffects: PendingEffectRegistry = pendingEffectRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance,
  turn: Turn = turnInstance,
  cause: RevolutionCause = 'chosen'
): void =>
  revolutionFor(
    REVOLUTION,
    Anarchy,
    playerGovernment,
    pendingEffects,
    ruleRegistry,
    turn,
    cause
  );

/** Finish a revolution whose Anarchy is over, by choosing one of the available governments. */
export const chooseGovernment = (
  playerGovernment: PlayerGovernment,
  GovernmentType: typeof Government,
  pendingEffects: PendingEffectRegistry = pendingEffectRegistryInstance,
  turn: Turn = turnInstance
): void =>
  chooseGovernmentFor(
    REVOLUTION,
    playerGovernment,
    GovernmentType,
    pendingEffects,
    turn
  );
