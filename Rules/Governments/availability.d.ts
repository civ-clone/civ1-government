import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import { Requirement } from '@civ-clone/core-requirement/Requirement';
import Availability from '@civ-clone/core-government/Rules/Availability';
import { Deriver } from '@civ-clone/core-requirement/RequirementRegistry';
/**
 * The rule `entry` is played by: a player may choose its subject while it has the advances the entry `requires`.
 *
 * Each entry is one alternative way to its government, not a condition every way must meet: `PlayerGovernment`
 * offers a government if *any* `Availability` rule allows it, so a second entry for the same government (as the
 * Pyramids' rule in `civ1-wonder` is) opens another way rather than closing this one.
 *
 * An entry with no targets (Despotism) is always met, so its rule only checks the government, as it always has.
 */
export declare const availabilityRulesFor: (
  entry: Requirement,
  playerResearchRegistry?: PlayerResearchRegistry
) => Availability[];
/** What `registerRules` gives the game's `requirements` to make each entry's rules with. */
export declare const deriveAvailabilityRules: (
  playerResearchRegistry: PlayerResearchRegistry
) => Deriver;
/**
 * Every rule about which governments a player may choose, one for each of `Requirements`' entries, as `registerRules`
 * registers them. For a rule registry without a game's `requirements` (tests, and rulesets that build on these): a
 * game's are registered through `game.requirements`, so a plugin can change an entry and its rule together.
 */
export declare const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry
) => Availability[];
export default getRules;
