"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerGovernmentRegistry_1 = require("@civ-clone/core-government/PlayerGovernmentRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Added_1 = require("@civ-clone/core-player/Rules/Added");
const Governments_1 = require("../../Governments");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const PlayerGovernment_1 = require("@civ-clone/core-government/PlayerGovernment");
const getRules = (playerGovernmentRegistry = PlayerGovernmentRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) => [
    new Added_1.default(new Effect_1.default((player) => {
        const playerGovernment = new PlayerGovernment_1.default(player, ruleRegistry);
        playerGovernment.set(new Governments_1.Despotism());
        playerGovernmentRegistry.register(playerGovernment);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=added.js.map