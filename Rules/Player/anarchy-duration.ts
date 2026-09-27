import AnarchyDuration, { RevolutionCause } from '../AnarchyDuration';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import { instance as rngInstance } from '@civ-clone/core-random';

export const getRules: (
  randomNumberGenerator?: () => number
) => AnarchyDuration[] = (
  randomNumberGenerator: () => number = rngInstance
): AnarchyDuration[] => [
  // One to four turns (Rome on 640K a Day, p18-19).
  new AnarchyDuration(
    'civ1-government:player/anarchy-duration/default',
    new Criterion(
      (player: Player, cause: RevolutionCause): boolean => cause === 'chosen'
    ),
    new Effect((): number => 1 + Math.floor(randomNumberGenerator() * 4))
  ),
  // Twice as long, two to eight turns, when civil disorder overthrows a
  // Democracy (Rome on 640K a Day, Democracy advance).
  new AnarchyDuration(
    'civ1-government:player/anarchy-duration/civil-disorder',
    new Criterion(
      (player: Player, cause: RevolutionCause): boolean =>
        cause === 'civil-disorder'
    ),
    new Effect((): number => 2 + Math.floor(randomNumberGenerator() * 7))
  ),
];

export default getRules;
