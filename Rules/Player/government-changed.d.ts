import { Engine } from '@civ-clone/core-engine/Engine';
import { PlayerWorldRegistry } from '@civ-clone/core-player-world/PlayerWorldRegistry';
import Changed from '@civ-clone/core-government/Rules/Changed';
export declare const getRules: (
  engine?: Engine,
  playerWorldRegistry?: PlayerWorldRegistry
) => Changed[];
export default getRules;
