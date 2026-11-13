"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseGovernment = exports.revolution = exports.turnsUntilChoice = exports.pendingRevolution = exports.registerHandler = exports.applyChosenGovernment = exports.RevolutionError = exports.REVOLUTION = void 0;
const core_pending_effect_1 = require("@civ-clone/core-pending-effect");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const revolution_1 = require("@civ-clone/base-government-change/lib/revolution");
Object.defineProperty(exports, "applyChosenGovernment", { enumerable: true, get: function () { return revolution_1.applyChosenGovernment; } });
const Governments_1 = require("../Governments");
// The revolution itself moved to base-government-change (civ-clone/web-renderer#1008). These keep their signatures and
//  pass it this package's save key and Anarchy.
/**
 * Recorded in the save for a revolution whose new government has not been
 * chosen yet. The target is the `PlayerGovernment`, and `endTurn` is the turn
 * the choice becomes due.
 */
exports.REVOLUTION = 'civ1-government:revolution';
var revolution_2 = require("@civ-clone/base-government-change/lib/revolution");
Object.defineProperty(exports, "RevolutionError", { enumerable: true, get: function () { return revolution_2.RevolutionError; } });
/** Registered with the rules, at import, so a revolution loaded from a save can still be finished. */
const registerHandler = (pendingEffects = core_pending_effect_1.instance) => (0, revolution_1.registerRevolutionHandler)(exports.REVOLUTION, pendingEffects);
exports.registerHandler = registerHandler;
const pendingRevolution = (playerGovernment, pendingEffects = core_pending_effect_1.instance) => (0, revolution_1.pendingRevolution)(exports.REVOLUTION, playerGovernment, pendingEffects);
exports.pendingRevolution = pendingRevolution;
/** Turns until the new government can be chosen: `0` when it can be chosen now, `null` with no revolution under way. */
const turnsUntilChoice = (playerGovernment, pendingEffects = core_pending_effect_1.instance, turn = Turn_1.instance) => (0, revolution_1.turnsUntilChoice)(exports.REVOLUTION, playerGovernment, pendingEffects, turn);
exports.turnsUntilChoice = turnsUntilChoice;
/**
 * Overthrow the current government. The player is in `Anarchy` for as many
 * turns as `AnarchyDuration` allows for the `cause`, then chooses a new
 * government through `ChooseGovernment`. With no Anarchy at all (the
 * Pyramids), the choice is due straight away and the current government stays
 * until it is made.
 */
const revolution = (playerGovernment, pendingEffects = core_pending_effect_1.instance, ruleRegistry = RuleRegistry_1.instance, turn = Turn_1.instance, cause = 'chosen') => (0, revolution_1.revolution)(exports.REVOLUTION, Governments_1.Anarchy, playerGovernment, pendingEffects, ruleRegistry, turn, cause);
exports.revolution = revolution;
/** Finish a revolution whose Anarchy is over, by choosing one of the available governments. */
const chooseGovernment = (playerGovernment, GovernmentType, pendingEffects = core_pending_effect_1.instance, turn = Turn_1.instance) => (0, revolution_1.chooseGovernment)(exports.REVOLUTION, playerGovernment, GovernmentType, pendingEffects, turn);
exports.chooseGovernment = chooseGovernment;
//# sourceMappingURL=revolution.js.map