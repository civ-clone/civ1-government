import {
  PendingEffect,
  PendingEffectRegistry,
} from '@civ-clone/core-pending-effect';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import { RevolutionCause } from '../Rules/AnarchyDuration';
import Government from '@civ-clone/core-government/Government';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';
/**
 * Recorded in the save for a revolution whose new government has not been
 * chosen yet. The target is the `PlayerGovernment`, and `endTurn` is the turn
 * the choice becomes due.
 */
export declare const REVOLUTION = 'civ1-government:revolution';
export declare class RevolutionError extends Error {}
/** What a pending revolution needs to discharge: the chosen government. */
export declare const applyChosenGovernment: (
  pendingEffect: PendingEffect,
  GovernmentType: typeof Government
) => void;
/** Registered with the rules, at import, so a revolution loaded from a save can still be finished. */
export declare const registerHandler: (
  pendingEffects?: PendingEffectRegistry
) => void;
export declare const pendingRevolution: (
  playerGovernment: PlayerGovernment,
  pendingEffects?: PendingEffectRegistry
) => PendingEffect | null;
/** Turns until the new government can be chosen: `0` when it can be chosen now, `null` with no revolution under way. */
export declare const turnsUntilChoice: (
  playerGovernment: PlayerGovernment,
  pendingEffects?: PendingEffectRegistry,
  turn?: Turn
) => number | null;
/**
 * Overthrow the current government. The player is in `Anarchy` for as many
 * turns as `AnarchyDuration` allows for the `cause`, then chooses a new
 * government through `ChooseGovernment`. With no Anarchy at all (the
 * Pyramids), the choice is due straight away and the current government stays
 * until it is made.
 */
export declare const revolution: (
  playerGovernment: PlayerGovernment,
  pendingEffects?: PendingEffectRegistry,
  ruleRegistry?: RuleRegistry,
  turn?: Turn,
  cause?: RevolutionCause
) => void;
/** Finish a revolution whose Anarchy is over, by choosing one of the available governments. */
export declare const chooseGovernment: (
  playerGovernment: PlayerGovernment,
  GovernmentType: typeof Government,
  pendingEffects?: PendingEffectRegistry,
  turn?: Turn
) => void;
