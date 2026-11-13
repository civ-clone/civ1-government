import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import {
  PlayerWorldRegistry,
  instance as playerWorldRegistryInstance,
} from '@civ-clone/core-player-world/PlayerWorldRegistry';
import {
  clearYieldCaches,
  emitGovernmentChanged,
  hasPlayerWorld,
} from '@civ-clone/base-government-change/lib/changed';
import Changed from '@civ-clone/core-government/Rules/Changed';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';

export const getRules: (
  engine?: Engine,
  playerWorldRegistry?: PlayerWorldRegistry
) => Changed[] = (
  engine: Engine = engineInstance,
  playerWorldRegistry: PlayerWorldRegistry = playerWorldRegistryInstance
): Changed[] => [
  new Changed(new Effect(emitGovernmentChanged(engine))),
  new Changed(
    new Criterion(hasPlayerWorld(playerWorldRegistry)),
    new Effect(clearYieldCaches(playerWorldRegistry))
  ),
];

export default getRules;
