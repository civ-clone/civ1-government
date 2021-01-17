"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const action_1 = require("./Rules/Player/action");
const added_1 = require("./Rules/Player/added");
const availability_1 = require("./Rules/Governments/availability");
const government_changed_1 = require("./Rules/Player/government-changed");
RuleRegistry_1.instance.register(...action_1.default(), ...added_1.default(), ...availability_1.default(), ...government_changed_1.default());
//# sourceMappingURL=registerRules.js.map