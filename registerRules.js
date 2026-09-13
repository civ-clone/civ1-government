"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const action_1 = require("./Rules/Player/action");
const added_1 = require("./Rules/Player/added");
const availability_1 = require("./Rules/Governments/availability");
const government_changed_1 = require("./Rules/Player/government-changed");
const core_game_1 = require("@civ-clone/core-game");
const register = (game) => game.rules.register(...(0, action_1.default)(game.playerGovernments), ...(0, added_1.default)(game.availableGovernments, game.playerGovernments, game.rules), ...(0, availability_1.default)(game.playerResearch), ...(0, government_changed_1.default)(game.engine, game.playerWorlds));
exports.register = register;
// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
(0, exports.register)(core_game_1.defaultGame);
exports.default = exports.register;
//# sourceMappingURL=registerRules.js.map