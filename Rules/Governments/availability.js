"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.deriveAvailabilityRules = exports.availabilityRulesFor = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Requirements_1 = require("../../Requirements");
const availability_1 = require("@civ-clone/base-government-change/lib/availability");
/**
 * The rule `entry` is played by: a player may choose its subject while it has the advances the entry `requires`.
 *
 * Each entry is one alternative way to its government, not a condition every way must meet: `PlayerGovernment`
 * offers a government if *any* `Availability` rule allows it, so a second entry for the same government (as the
 * Pyramids' rule in `civ1-wonder` is) opens another way rather than closing this one.
 *
 * An entry with no targets (Despotism) is always met, so its rule only checks the government, as it always has.
 *
 * The rule itself moved to base-government-change (civ-clone/web-renderer#1008).
 */
const availabilityRulesFor = (entry, playerResearchRegistry = PlayerResearchRegistry_1.instance) => (0, availability_1.availabilityRulesFor)(entry, playerResearchRegistry);
exports.availabilityRulesFor = availabilityRulesFor;
/** What `registerRules` gives the game's `requirements` to make each entry's rules with. */
const deriveAvailabilityRules = (playerResearchRegistry) => (entry) => (0, exports.availabilityRulesFor)(entry, playerResearchRegistry);
exports.deriveAvailabilityRules = deriveAvailabilityRules;
/**
 * Every rule about which governments a player may choose, one for each of `Requirements`' entries, as `registerRules`
 * registers them. For a rule registry without a game's `requirements` (tests, and rulesets that build on these): a
 * game's are registered through `game.requirements`, so a plugin can change an entry and its rule together.
 */
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance) => Requirements_1.default.flatMap((entry) => (0, exports.availabilityRulesFor)(entry, playerResearchRegistry));
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=availability.js.map