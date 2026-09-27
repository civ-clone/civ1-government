import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';

/**
 * How many turns of `Anarchy` a revolution starting now would cause. Every
 * matching rule is asked and the shortest answer wins, so a rule that removes
 * Anarchy (the Pyramids, in `civ1-wonder`) only has to return `0`.
 */
export class AnarchyDuration extends Rule<[Player], number> {}

export default AnarchyDuration;
