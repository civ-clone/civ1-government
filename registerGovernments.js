"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Governments_1 = require("./Governments");
const AvailableGovernmentRegistry_1 = require("@civ-clone/core-government/AvailableGovernmentRegistry");
// `Anarchy` is registered so a game saved during one can name it and be
// loaded. No `Availability` rule matches it, so it's never offered as a
// choice.
AvailableGovernmentRegistry_1.instance.register(Governments_1.Anarchy, Governments_1.Communism, Governments_1.Democracy, Governments_1.Despotism, Governments_1.Monarchy, Governments_1.Republic);
//# sourceMappingURL=registerGovernments.js.map