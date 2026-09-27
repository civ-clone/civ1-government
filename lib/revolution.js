"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseGovernment = exports.revolution = exports.turnsUntilChoice = exports.pendingRevolution = exports.registerHandler = exports.applyChosenGovernment = exports.RevolutionError = exports.REVOLUTION = void 0;
const core_pending_effect_1 = require("@civ-clone/core-pending-effect");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const Governments_1 = require("../Governments");
const AnarchyDuration_1 = require("../Rules/AnarchyDuration");
/**
 * Recorded in the save for a revolution whose new government has not been
 * chosen yet. The target is the `PlayerGovernment`, and `endTurn` is the turn
 * the choice becomes due.
 */
exports.REVOLUTION = 'civ1-government:revolution';
class RevolutionError extends Error {
}
exports.RevolutionError = RevolutionError;
/** What a pending revolution needs to discharge: the chosen government. */
const applyChosenGovernment = (pendingEffect, GovernmentType) => pendingEffect.target().set(new GovernmentType());
exports.applyChosenGovernment = applyChosenGovernment;
/** Registered with the rules, at import, so a revolution loaded from a save can still be finished. */
const registerHandler = (pendingEffects = core_pending_effect_1.instance) => pendingEffects.handler(exports.REVOLUTION, (pendingEffect, GovernmentType) => (0, exports.applyChosenGovernment)(pendingEffect, GovernmentType));
exports.registerHandler = registerHandler;
const pendingRevolution = (playerGovernment, pendingEffects = core_pending_effect_1.instance) => {
    var _a;
    return (_a = pendingEffects
        .getByTarget(playerGovernment)
        .find((pendingEffect) => pendingEffect.handler() === exports.REVOLUTION)) !== null && _a !== void 0 ? _a : null;
};
exports.pendingRevolution = pendingRevolution;
/** Turns until the new government can be chosen: `0` when it can be chosen now, `null` with no revolution under way. */
const turnsUntilChoice = (playerGovernment, pendingEffects = core_pending_effect_1.instance, turn = Turn_1.instance) => {
    const pendingEffect = (0, exports.pendingRevolution)(playerGovernment, pendingEffects);
    if (pendingEffect === null) {
        return null;
    }
    return Math.max(0, Number(pendingEffect.data().endTurn) - turn.value());
};
exports.turnsUntilChoice = turnsUntilChoice;
/**
 * Overthrow the current government. The player is in `Anarchy` for as many
 * turns as `AnarchyDuration` allows, then chooses a new government through
 * `ChooseGovernment`. With no Anarchy at all (the Pyramids), the choice is due
 * straight away and the current government stays until it is made.
 */
const revolution = (playerGovernment, pendingEffects = core_pending_effect_1.instance, ruleRegistry = RuleRegistry_1.instance, turn = Turn_1.instance) => {
    if ((0, exports.pendingRevolution)(playerGovernment, pendingEffects) !== null) {
        throw new RevolutionError('A revolution is already under way.');
    }
    const duration = Math.max(0, Math.min(...ruleRegistry.process(AnarchyDuration_1.default, playerGovernment.player())));
    if (!Number.isFinite(duration)) {
        throw new RevolutionError('No `AnarchyDuration` rule applies.');
    }
    pendingEffects.register(new core_pending_effect_1.PendingEffect(exports.REVOLUTION, playerGovernment, {
        endTurn: String(turn.value() + duration),
    }));
    if (duration > 0) {
        playerGovernment.set(new Governments_1.Anarchy());
    }
};
exports.revolution = revolution;
/** Finish a revolution whose Anarchy is over, by choosing one of the available governments. */
const chooseGovernment = (playerGovernment, GovernmentType, pendingEffects = core_pending_effect_1.instance, turn = Turn_1.instance) => {
    const pendingEffect = (0, exports.pendingRevolution)(playerGovernment, pendingEffects);
    if (pendingEffect === null ||
        (0, exports.turnsUntilChoice)(playerGovernment, pendingEffects, turn) !== 0) {
        throw new RevolutionError('No government can be chosen yet.');
    }
    if (!playerGovernment.available().includes(GovernmentType)) {
        throw new RevolutionError(`${GovernmentType.name} is not available.`);
    }
    pendingEffects.discharge(pendingEffect, GovernmentType);
};
exports.chooseGovernment = chooseGovernment;
//# sourceMappingURL=revolution.js.map