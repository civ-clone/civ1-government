"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerActions_1 = require("../../PlayerActions");
const core_pending_effect_1 = require("@civ-clone/core-pending-effect");
const PlayerGovernmentRegistry_1 = require("@civ-clone/core-government/PlayerGovernmentRegistry");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const revolution_1 = require("../../lib/revolution");
const Action_1 = require("@civ-clone/core-player/Rules/Action");
const Governments_1 = require("../../Governments");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const getRules = (playerGovernmentRegistry = PlayerGovernmentRegistry_1.instance, pendingEffects = core_pending_effect_1.instance, turn = Turn_1.instance) => {
    // Here rather than when a revolution starts, so a game loaded mid-Anarchy
    // can still finish it.
    (0, revolution_1.registerHandler)(pendingEffects);
    return [
        new Action_1.default(new Criterion_1.default((player) => !playerGovernmentRegistry.getByPlayer(player).is(Governments_1.Anarchy)), 
        // With the Pyramids there's no Anarchy, but the new government still
        // has to be chosen before another revolution.
        new Criterion_1.default((player) => (0, revolution_1.pendingRevolution)(playerGovernmentRegistry.getByPlayer(player), pendingEffects) === null), new Effect_1.default((player) => [
            new PlayerActions_1.Revolution(player, playerGovernmentRegistry.getByPlayer(player)),
        ])),
        new Action_1.default(new Criterion_1.default((player) => (0, revolution_1.turnsUntilChoice)(playerGovernmentRegistry.getByPlayer(player), pendingEffects, turn) === 0), new Effect_1.default((player) => [
            new PlayerActions_1.ChooseGovernment(player, playerGovernmentRegistry.getByPlayer(player)),
        ])),
    ];
};
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=action.js.map