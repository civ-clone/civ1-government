import {
  AvailableGovernmentRegistry,
  instance as availableGovernmentRegistryInstance,
} from '@civ-clone/core-government/AvailableGovernmentRegistry';
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
import High from '@civ-clone/core-rule/Priorities/High';
import Player from '@civ-clone/core-player/Player';
import addPlayerGovernment from '@civ-clone/base-government-change/lib/playerGovernment';

export const getRules: (
  availableGovernmentRegistry?: AvailableGovernmentRegistry,
  playerGovernmentRegistry?: PlayerGovernmentRegistry,
  ruleRegistry?: RuleRegistry
) => Added[] = (
  availableGovernmentRegistry: AvailableGovernmentRegistry = availableGovernmentRegistryInstance,
  playerGovernmentRegistry: PlayerGovernmentRegistry = playerGovernmentRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): Added[] => [
  // Every player starts under Despotism.
  new Added(
    new High(),
    new Effect((player: Player): void =>
      addPlayerGovernment(
        player,
        Despotism,
        availableGovernmentRegistry,
        playerGovernmentRegistry,
        ruleRegistry
      )
    )
  ),
];

export default getRules;
