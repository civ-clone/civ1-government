import { Requirement } from '@civ-clone/core-requirement/Requirement';
/**
 * The advance a player needs before it may choose each government: one rule each. Despotism needs none, so it is
 * always available. A government is available by any rule that allows it, so each entry is one way to it: the
 * Pyramids' way is a rule of `civ1-wonder`'s own.
 */
export declare const availability: Requirement[];
export default availability;
