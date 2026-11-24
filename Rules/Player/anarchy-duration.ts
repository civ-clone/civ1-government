import {
  forCause,
  randomDuration,
} from '@civ-clone/base-government-change/lib/anarchyDuration';
import AnarchyDuration from '../AnarchyDuration';
import { Anarchy } from '../../Governments';
import Criterion from '@civ-clone/core-rule/Criterion';
import Description from '@civ-clone/core-rule/Description';
import Effect from '@civ-clone/core-rule/Effect';
import { instance as rngInstance } from '@civ-clone/core-random';

/** The turns of Anarchy a revolution brings, and twice that when civil disorder overthrows a Democracy. */
export const REVOLUTION_TURNS: [min: number, max: number] = [1, 4],
  CIVIL_DISORDER_TURNS: [min: number, max: number] = [2, 8];

// What leads to Anarchy and for how long, for the Civilopedia (civ-clone/web-renderer#621).
const follows = (cause: string, [min, max]: [number, number]): Description =>
  new Description({
    type: 'anarchy_follows',
    subject: Anarchy,
    cause,
    min,
    max,
  });

export const getRules: (
  randomNumberGenerator?: () => number
) => AnarchyDuration[] = (
  randomNumberGenerator: () => number = rngInstance
): AnarchyDuration[] => [
  // One to four turns (Rome on 640K a Day, p18-19).
  new AnarchyDuration(
    'civ1-government:player/anarchy-duration/default',
    new Criterion(forCause('chosen')),
    new Effect(randomDuration(...REVOLUTION_TURNS, randomNumberGenerator)),
    follows('chosen', REVOLUTION_TURNS)
  ),
  // Twice as long, two to eight turns, when civil disorder overthrows a
  // Democracy (Rome on 640K a Day, Democracy advance).
  new AnarchyDuration(
    'civ1-government:player/anarchy-duration/civil-disorder',
    new Criterion(forCause('civil-disorder')),
    new Effect(randomDuration(...CIVIL_DISORDER_TURNS, randomNumberGenerator)),
    follows('civil-disorder', CIVIL_DISORDER_TURNS)
  ),
];

export default getRules;
