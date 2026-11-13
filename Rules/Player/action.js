"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const core_pending_effect_1 = require("@civ-clone/core-pending-effect");
const PlayerGovernmentRegistry_1 = require("@civ-clone/core-government/PlayerGovernmentRegistry");
const revolution_1 = require("../../lib/revolution");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const actions_1 = require("@civ-clone/base-government-change/lib/actions");
const Action_1 = require("@civ-clone/core-player/Rules/Action");
const Governments_1 = require("../../Governments");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const getRules = (playerGovernmentRegistry = PlayerGovernmentRegistry_1.instance, pendingEffects = core_pending_effect_1.instance, turn = Turn_1.instance) => {
    // Here rather than when a revolution starts, so a game loaded mid-Anarchy
    // can still finish it.
    (0, revolution_1.registerHandler)(pendingEffects);
    return [
        new Action_1.default(new Criterion_1.default((0, actions_1.notInInterim)(Governments_1.Anarchy, playerGovernmentRegistry)), 
        // With the Pyramids there's no Anarchy, but the new government still
        // has to be chosen before another revolution.
        new Criterion_1.default((0, actions_1.noRevolutionPending)(revolution_1.REVOLUTION, playerGovernmentRegistry, pendingEffects)), new Effect_1.default((0, actions_1.offerRevolution)(playerGovernmentRegistry))),
        new Action_1.default(new Criterion_1.default((0, actions_1.choiceDue)(revolution_1.REVOLUTION, playerGovernmentRegistry, pendingEffects, turn)), new Effect_1.default((0, actions_1.offerGovernmentChoice)(playerGovernmentRegistry))),
    ];
};
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=action.js.map