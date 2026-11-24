import AnarchyDuration from '../AnarchyDuration';
/** The turns of Anarchy a revolution brings, and twice that when civil disorder overthrows a Democracy. */
export declare const REVOLUTION_TURNS: [min: number, max: number],
  CIVIL_DISORDER_TURNS: [min: number, max: number];
export declare const getRules: (
  randomNumberGenerator?: () => number
) => AnarchyDuration[];
export default getRules;
