"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.CIVIL_DISORDER_TURNS = exports.REVOLUTION_TURNS = void 0;
const anarchyDuration_1 = require("@civ-clone/base-government-change/lib/anarchyDuration");
const AnarchyDuration_1 = require("../AnarchyDuration");
const Governments_1 = require("../../Governments");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Description_1 = require("@civ-clone/core-rule/Description");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const core_random_1 = require("@civ-clone/core-random");
/** The turns of Anarchy a revolution brings, and twice that when civil disorder overthrows a Democracy. */
exports.REVOLUTION_TURNS = [1, 4], exports.CIVIL_DISORDER_TURNS = [2, 8];
// What leads to Anarchy and for how long, for the Civilopedia (civ-clone/web-renderer#621).
const follows = (cause, [min, max]) => new Description_1.default({
    type: 'anarchy_follows',
    subject: Governments_1.Anarchy,
    cause,
    min,
    max,
});
const getRules = (randomNumberGenerator = core_random_1.instance) => [
    // One to four turns (Rome on 640K a Day, p18-19).
    new AnarchyDuration_1.default('civ1-government:player/anarchy-duration/default', new Criterion_1.default((0, anarchyDuration_1.forCause)('chosen')), new Effect_1.default((0, anarchyDuration_1.randomDuration)(...exports.REVOLUTION_TURNS, randomNumberGenerator)), follows('chosen', exports.REVOLUTION_TURNS)),
    // Twice as long, two to eight turns, when civil disorder overthrows a
    // Democracy (Rome on 640K a Day, Democracy advance).
    new AnarchyDuration_1.default('civ1-government:player/anarchy-duration/civil-disorder', new Criterion_1.default((0, anarchyDuration_1.forCause)('civil-disorder')), new Effect_1.default((0, anarchyDuration_1.randomDuration)(...exports.CIVIL_DISORDER_TURNS, randomNumberGenerator)), follows('civil-disorder', exports.CIVIL_DISORDER_TURNS)),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=anarchy-duration.js.map