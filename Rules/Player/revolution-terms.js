"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Governments_1 = require("../../Governments");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const revolution_1 = require("../../lib/revolution");
const RevolutionTerms_1 = require("@civ-clone/base-government-change/Rules/RevolutionTerms");
const terms_1 = require("@civ-clone/base-government-change/lib/terms");
// This package's revolution, for code outside it (a computer player) that starts and finishes revolutions through
//  base-government-change's `lib/revolution`: the save key and Anarchy that `lib/revolution` here passes it.
const getRules = () => [
    new RevolutionTerms_1.default('civ1-government:player/revolution-terms', new Effect_1.default((0, terms_1.terms)(revolution_1.REVOLUTION, Governments_1.Anarchy))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=revolution-terms.js.map