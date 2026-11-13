"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const anarchyDuration_1 = require("@civ-clone/base-government-change/lib/anarchyDuration");
const AnarchyDuration_1 = require("../AnarchyDuration");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const core_random_1 = require("@civ-clone/core-random");
const getRules = (randomNumberGenerator = core_random_1.instance) => [
    // One to four turns (Rome on 640K a Day, p18-19).
    new AnarchyDuration_1.default('civ1-government:player/anarchy-duration/default', new Criterion_1.default((0, anarchyDuration_1.forCause)('chosen')), new Effect_1.default((0, anarchyDuration_1.randomDuration)(1, 4, randomNumberGenerator))),
    // Twice as long, two to eight turns, when civil disorder overthrows a
    // Democracy (Rome on 640K a Day, Democracy advance).
    new AnarchyDuration_1.default('civ1-government:player/anarchy-duration/civil-disorder', new Criterion_1.default((0, anarchyDuration_1.forCause)('civil-disorder')), new Effect_1.default((0, anarchyDuration_1.randomDuration)(2, 8, randomNumberGenerator))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=anarchy-duration.js.map