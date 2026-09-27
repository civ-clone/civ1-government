"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AnarchyDuration_1 = require("../AnarchyDuration");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const core_random_1 = require("@civ-clone/core-random");
const getRules = (randomNumberGenerator = core_random_1.instance) => [
    // One to four turns (Rome on 640K a Day, p18-19).
    new AnarchyDuration_1.default('civ1-government:player/anarchy-duration/default', new Effect_1.default(() => 1 + Math.floor(randomNumberGenerator() * 4))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=anarchy-duration.js.map