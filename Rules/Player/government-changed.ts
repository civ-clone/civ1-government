import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import {
  PlayerWorldRegistry,
  instance as playerWorldRegistryInstance,
} from '@civ-clone/core-player-world/PlayerWorldRegistry';
import Changed from '@civ-clone/core-government/Rules/Changed';
import Effect from '@civ-clone/core-rule/Effect';
import Government from '@civ-clone/core-government/Government';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';

export const getRules: (
  engine?: Engine,
  playerWorldRegistry?: PlayerWorldRegistry
) => Changed[] = (
  engine: Engine = engineInstance,
  playerWorldRegistry: PlayerWorldRegistry = playerWorldRegistryInstance
): Changed[] => [
  new Changed(
    new Effect((player: Player, government: Government): void => {
      engine.emit('player:government:changed', player, government);
    })
  ),
  new Changed(
    new Effect((player: Player): void => {
      const playerWorld = playerWorldRegistry.getByPlayer(player);

      playerWorld
        .entries()
        .forEach((tile: Tile): void => tile.clearYieldCache(player));
    })
  ),
];

export default getRules;
