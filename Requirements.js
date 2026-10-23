"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availability = void 0;
const Advances_1 = require("@civ-clone/library-science/Advances");
const Governments_1 = require("./Governments");
const Requirement_1 = require("@civ-clone/core-requirement/Requirement");
// What Civilization's governments need before a player may choose them, as the entries
//  `Rules/Governments/availability` makes its rules from (civ-clone/web-renderer#37). `registerRules` adds them to the
//  game's `requirements`.
/**
 * The advance a player needs before it may choose each government: one rule each. Despotism needs none, so it is
 * always available. A government is available by any rule that allows it, so each entry is one way to it: the
 * Pyramids' way is a rule of `civ1-wonder`'s own.
 */
exports.availability = (0, Requirement_1.table)('civ1-government:governments/availability', 'requires', [
    [Governments_1.Despotism],
    [Governments_1.Communism, Advances_1.Communism],
    [Governments_1.Democracy, Advances_1.Democracy],
    [Governments_1.Monarchy, Advances_1.Monarchy],
    [Governments_1.Republic, Advances_1.TheRepublic],
]);
exports.default = exports.availability;
//# sourceMappingURL=Requirements.js.map