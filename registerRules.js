"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const action_1 = require("./Rules/Player/action");
const added_1 = require("./Rules/Player/added");
const availability_1 = require("./Rules/Governments/availability");
const government_changed_1 = require("./Rules/Player/government-changed");
RuleRegistry_1.instance.register(...(0, action_1.default)(), ...(0, added_1.default)(), ...(0, availability_1.default)(), ...(0, government_changed_1.default)());
//# sourceMappingURL=registerRules.js.map