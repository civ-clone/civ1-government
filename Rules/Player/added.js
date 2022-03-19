"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AvailableGovernmentRegistry_1 = require("@civ-clone/core-government/AvailableGovernmentRegistry");
const PlayerGovernmentRegistry_1 = require("@civ-clone/core-government/PlayerGovernmentRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Added_1 = require("@civ-clone/core-player/Rules/Added");
const Governments_1 = require("../../Governments");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const High_1 = require("@civ-clone/core-rule/Priorities/High");
const PlayerGovernment_1 = require("@civ-clone/core-government/PlayerGovernment");
const getRules = (availableGovernmentRegistry = AvailableGovernmentRegistry_1.instance, playerGovernmentRegistry = PlayerGovernmentRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) => [
    new Added_1.default(new High_1.default(), new Effect_1.default((player) => {
        const playerGovernment = new PlayerGovernment_1.default(player, availableGovernmentRegistry, ruleRegistry);
        playerGovernment.set(new Governments_1.Despotism());
        playerGovernmentRegistry.register(playerGovernment);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=added.js.map