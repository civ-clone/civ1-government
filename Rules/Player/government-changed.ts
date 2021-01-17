import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import Changed from '@civ-clone/core-government/Rules/Changed';
import Effect from '@civ-clone/core-rule/Effect';
import Government from '@civ-clone/core-government/Government';
import Player from '@civ-clone/core-player/Player';

export const getRules: (engine?: Engine) => Changed[] = (
  engine: Engine = engineInstance
): Changed[] => [
  new Changed(
    new Effect((player: Player, government: Government): void => {
      engine.emit('player:government:changed', player, government);
    })
  ),
];

export default getRules;
