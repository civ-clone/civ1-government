"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChooseGovernment = exports.Revolution = void 0;
const MandatoryPlayerAction_1 = require("@civ-clone/core-player/MandatoryPlayerAction");
var PlayerActions_1 = require("@civ-clone/library-government/PlayerActions");
Object.defineProperty(exports, "Revolution", { enumerable: true, get: function () { return PlayerActions_1.Revolution; } });
/** Offered once a revolution's Anarchy is over, and must be answered before the turn can end. */
class ChooseGovernment extends MandatoryPlayerAction_1.default {
}
exports.ChooseGovernment = ChooseGovernment;
//# sourceMappingURL=PlayerActions.js.map