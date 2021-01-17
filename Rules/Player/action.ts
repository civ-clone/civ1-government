import {
  PlayerGovernmentRegistry,
  instance as playerGovernmentRegistryInstance,
} from '@civ-clone/core-government/PlayerGovernmentRegistry';
import { Anarchy } from '../../Governments';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import PlayerAction from '@civ-clone/core-player/PlayerAction';
import { Revolution } from '@civ-clone/core-government/PlayerActions';
import Action from '@civ-clone/core-player/Rules/Action';

export const getRules: (
  playerGovernmentRegistry?: PlayerGovernmentRegistry
) => Action[] = (
  playerGovernmentRegistry: PlayerGovernmentRegistry = playerGovernmentRegistryInstance
): Action[] => [
  new Action(
    new Criterion(
      (player: Player): boolean =>
        !playerGovernmentRegistry.getByPlayer(player).is(Anarchy)
    ),
    new Effect((player: Player): PlayerAction[] => [
      new Revolution(playerGovernmentRegistry.getByPlayer(player)),
    ])
  ),
];

export default getRules;
