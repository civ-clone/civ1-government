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
import { Anarchy } from '../Governments';
import AnarchyDuration, { RevolutionCause } from '../Rules/AnarchyDuration';
import Government from '@civ-clone/core-government/Government';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';

/**
 * Recorded in the save for a revolution whose new government has not been
 * chosen yet. The target is the `PlayerGovernment`, and `endTurn` is the turn
 * the choice becomes due.
 */
export const REVOLUTION = 'civ1-government:revolution';

export class RevolutionError extends Error {}

/** What a pending revolution needs to discharge: the chosen government. */
export const applyChosenGovernment = (
  pendingEffect: PendingEffect,
  GovernmentType: typeof Government
): void =>
  (pendingEffect.target() as PlayerGovernment).set(new GovernmentType());

/** Registered with the rules, at import, so a revolution loaded from a save can still be finished. */
export const registerHandler = (
  pendingEffects: PendingEffectRegistry = pendingEffectRegistryInstance
): void =>
  pendingEffects.handler(REVOLUTION, (pendingEffect, GovernmentType) =>
    applyChosenGovernment(pendingEffect, GovernmentType as typeof Government)
  );

export const pendingRevolution = (
  playerGovernment: PlayerGovernment,
  pendingEffects: PendingEffectRegistry = pendingEffectRegistryInstance
): PendingEffect | null =>
  pendingEffects
    .getByTarget(playerGovernment)
    .find(
      (pendingEffect: PendingEffect): boolean =>
        pendingEffect.handler() === REVOLUTION
    ) ?? null;

/** Turns until the new government can be chosen: `0` when it can be chosen now, `null` with no revolution under way. */
export const turnsUntilChoice = (
  playerGovernment: PlayerGovernment,
  pendingEffects: PendingEffectRegistry = pendingEffectRegistryInstance,
  turn: Turn = turnInstance
): number | null => {
  const pendingEffect = pendingRevolution(playerGovernment, pendingEffects);

  if (pendingEffect === null) {
    return null;
  }

  return Math.max(0, Number(pendingEffect.data().endTurn) - turn.value());
};

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
): void => {
  if (pendingRevolution(playerGovernment, pendingEffects) !== null) {
    throw new RevolutionError('A revolution is already under way.');
  }

  const duration = Math.max(
    0,
    Math.min(
      ...ruleRegistry.process(AnarchyDuration, playerGovernment.player(), cause)
    )
  );

  if (!Number.isFinite(duration)) {
    throw new RevolutionError('No `AnarchyDuration` rule applies.');
  }

  pendingEffects.register(
    new PendingEffect(REVOLUTION, playerGovernment, {
      endTurn: String(turn.value() + duration),
    })
  );

  if (duration > 0) {
    playerGovernment.set(new Anarchy());
  }
};

/** Finish a revolution whose Anarchy is over, by choosing one of the available governments. */
export const chooseGovernment = (
  playerGovernment: PlayerGovernment,
  GovernmentType: typeof Government,
  pendingEffects: PendingEffectRegistry = pendingEffectRegistryInstance,
  turn: Turn = turnInstance
): void => {
  const pendingEffect = pendingRevolution(playerGovernment, pendingEffects);

  if (
    pendingEffect === null ||
    turnsUntilChoice(playerGovernment, pendingEffects, turn) !== 0
  ) {
    throw new RevolutionError('No government can be chosen yet.');
  }

  if (!playerGovernment.available().includes(GovernmentType)) {
    throw new RevolutionError(`${GovernmentType.name} is not available.`);
  }

  pendingEffects.discharge(pendingEffect, GovernmentType);
};
