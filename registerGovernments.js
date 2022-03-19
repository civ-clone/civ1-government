"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Governments_1 = require("./Governments");
const AvailableGovernmentRegistry_1 = require("@civ-clone/core-government/AvailableGovernmentRegistry");
AvailableGovernmentRegistry_1.instance.register(Governments_1.Communism, Governments_1.Democracy, Governments_1.Despotism, Governments_1.Monarchy, Governments_1.Republic);
//# sourceMappingURL=registerGovernments.js.map