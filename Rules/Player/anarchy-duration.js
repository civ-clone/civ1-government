"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AnarchyDuration_1 = require("../AnarchyDuration");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const core_random_1 = require("@civ-clone/core-random");
const getRules = (randomNumberGenerator = core_random_1.instance) => [
    // One to four turns (Rome on 640K a Day, p18-19).
    new AnarchyDuration_1.default('civ1-government:player/anarchy-duration/default', new Criterion_1.default((player, cause) => cause === 'chosen'), new Effect_1.default(() => 1 + Math.floor(randomNumberGenerator() * 4))),
    // Twice as long, two to eight turns, when civil disorder overthrows a
    // Democracy (Rome on 640K a Day, Democracy advance).
    new AnarchyDuration_1.default('civ1-government:player/anarchy-duration/civil-disorder', new Criterion_1.default((player, cause) => cause === 'civil-disorder'), new Effect_1.default(() => 2 + Math.floor(randomNumberGenerator() * 7))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=anarchy-duration.js.map