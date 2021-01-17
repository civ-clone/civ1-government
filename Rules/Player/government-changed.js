"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const Changed_1 = require("@civ-clone/core-government/Rules/Changed");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const getRules = (engine = Engine_1.instance) => [
    new Changed_1.default(new Effect_1.default((player, government) => {
        engine.emit('player:government:changed', player, government);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=government-changed.js.map