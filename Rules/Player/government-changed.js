"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const PlayerWorldRegistry_1 = require("@civ-clone/core-player-world/PlayerWorldRegistry");
const changed_1 = require("@civ-clone/base-government-change/lib/changed");
const Changed_1 = require("@civ-clone/core-government/Rules/Changed");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const getRules = (engine = Engine_1.instance, playerWorldRegistry = PlayerWorldRegistry_1.instance) => [
    new Changed_1.default(new Effect_1.default((0, changed_1.emitGovernmentChanged)(engine))),
    new Changed_1.default(new Criterion_1.default((0, changed_1.hasPlayerWorld)(playerWorldRegistry)), new Effect_1.default((0, changed_1.clearYieldCaches)(playerWorldRegistry))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=government-changed.js.map