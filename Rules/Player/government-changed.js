"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const PlayerWorldRegistry_1 = require("@civ-clone/core-player-world/PlayerWorldRegistry");
const Changed_1 = require("@civ-clone/core-government/Rules/Changed");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const getRules = (engine = Engine_1.instance, playerWorldRegistry = PlayerWorldRegistry_1.instance) => [
    new Changed_1.default(new Effect_1.default((player, government) => {
        engine.emit('player:government:changed', player, government);
    })),
    new Changed_1.default(new Criterion_1.default((player) => {
        try {
            playerWorldRegistry.getByPlayer(player);
            return true;
        }
        catch (e) {
            if (e instanceof TypeError &&
                e.message.match(/Wrong number of player worlds exist/)) {
                return false;
            }
            throw e;
        }
    }), new Effect_1.default((player) => {
        const playerWorld = playerWorldRegistry.getByPlayer(player);
        playerWorld
            .entries()
            .forEach((tile) => tile.clearYieldCache(player));
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=government-changed.js.map