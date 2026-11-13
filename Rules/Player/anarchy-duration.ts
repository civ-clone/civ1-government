import {
  forCause,
  randomDuration,
} from '@civ-clone/base-government-change/lib/anarchyDuration';
import AnarchyDuration from '../AnarchyDuration';
import Criterion from '@civ-clone/core-rule/Criterion';
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
    new Criterion(forCause('chosen')),
    new Effect(randomDuration(1, 4, randomNumberGenerator))
  ),
  // Twice as long, two to eight turns, when civil disorder overthrows a
  // Democracy (Rome on 640K a Day, Democracy advance).
  new AnarchyDuration(
    'civ1-government:player/anarchy-duration/civil-disorder',
    new Criterion(forCause('civil-disorder')),
    new Effect(randomDuration(2, 8, randomNumberGenerator))
  ),
];

export default getRules;
