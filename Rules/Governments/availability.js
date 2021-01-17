"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Advances_1 = require("@civ-clone/base-science-civ1/Advances");
const Governments_1 = require("../../Governments");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Availability_1 = require("@civ-clone/core-government/Rules/Availability");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance) => [
    ...[
        [Governments_1.Monarchy, Advances_1.Monarchy],
        [Governments_1.Republic, Advances_1.TheRepublic],
    ].map(([AvailableGovernment, RequiredAdvance]) => new Availability_1.default(new Criterion_1.default((GovernmentType) => GovernmentType === AvailableGovernment), new Criterion_1.default((GovernmentType, player) => {
        const playerResearch = playerResearchRegistry.getByPlayer(player);
        return playerResearch.completed(RequiredAdvance);
    }))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=availability.js.map