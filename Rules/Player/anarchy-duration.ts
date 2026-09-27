import AnarchyDuration from '../AnarchyDuration';
import Effect from '@civ-clone/core-rule/Effect';
import { instance as rngInstance } from '@civ-clone/core-random';

export const getRules: (
  randomNumberGenerator?: () => number
) => AnarchyDuration[] = (
  randomNumberGenerator: () => number = rngInstance
): AnarchyDuration[] => [
  // One to four turns (Rome on 640K a Day, p18-19).
  new AnarchyDuration(
    'civ1-government:player/anarchy-duration/default',
    new Effect((): number => 1 + Math.floor(randomNumberGenerator() * 4))
  ),
];

export default getRules;
