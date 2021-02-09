"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerGovernmentRegistry_1 = require("@civ-clone/core-government/PlayerGovernmentRegistry");
const Governments_1 = require("../../Governments");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const PlayerActions_1 = require("@civ-clone/core-government/PlayerActions");
const Action_1 = require("@civ-clone/core-player/Rules/Action");
const getRules = (playerGovernmentRegistry = PlayerGovernmentRegistry_1.instance) => [
    new Action_1.default(new Criterion_1.default((player) => !playerGovernmentRegistry.getByPlayer(player).is(Governments_1.Anarchy)), new Effect_1.default((player) => [
        new PlayerActions_1.Revolution(playerGovernmentRegistry.getByPlayer(player)),
    ])),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=action.js.map