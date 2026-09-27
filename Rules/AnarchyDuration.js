"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnarchyDuration = void 0;
const Rule_1 = require("@civ-clone/core-rule/Rule");
/**
 * How many turns of `Anarchy` a revolution starting now would cause. Every
 * matching rule is asked and the shortest answer wins, so a rule that removes
 * Anarchy (the Pyramids, in `civ1-wonder`) only has to return `0`.
 */
class AnarchyDuration extends Rule_1.default {
}
exports.AnarchyDuration = AnarchyDuration;
exports.default = AnarchyDuration;
//# sourceMappingURL=AnarchyDuration.js.map