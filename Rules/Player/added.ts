import {
  PlayerGovernmentRegistry,
  instance as playerGovernmentRegistryInstance,
} from '@civ-clone/core-government/PlayerGovernmentRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Added from '@civ-clone/core-player/Rules/Added';
import { Despotism } from '../../Governments';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';

export const getRules: (
  playerGovernmentRegistry?: PlayerGovernmentRegistry,
  ruleRegistry?: RuleRegistry
) => Added[] = (
  playerGovernmentRegistry: PlayerGovernmentRegistry = playerGovernmentRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): Added[] => [
  new Added(
    new Effect((player: Player): void => {
      const playerGovernment = new PlayerGovernment(player, ruleRegistry);

      playerGovernment.set(new Despotism());

      playerGovernmentRegistry.register(playerGovernment);
    })
  ),
];

export default getRules;
