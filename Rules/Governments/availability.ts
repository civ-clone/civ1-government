import {
  Communism as CommunismAdvance,
  Democracy as DemocracyAdvance,
  Monarchy as MonarchyAdvance,
  TheRepublic,
} from '@civ-clone/civ1-science/Advances';
import {
  Communism,
  Democracy,
  Despotism,
  Monarchy,
  Republic,
} from '../../Governments';
import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import Availability from '@civ-clone/core-government/Rules/Availability';
import Criterion from '@civ-clone/core-rule/Criterion';
import Government from '@civ-clone/core-government/Government';
import Player from '@civ-clone/core-player/Player';

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry
) => Availability[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance
): Availability[] => [
  new Availability(
    new Criterion(
      (GovernmentType: typeof Government): boolean =>
        GovernmentType === Despotism
    )
  ),
  ...[
    [Communism, CommunismAdvance],
    [Democracy, DemocracyAdvance],
    [Monarchy, MonarchyAdvance],
    [Republic, TheRepublic],
  ].map(
    ([AvailableGovernment, RequiredAdvance]) =>
      new Availability(
        new Criterion(
          (GovernmentType: typeof Government): boolean =>
            GovernmentType === AvailableGovernment
        ),
        new Criterion((GovernmentType: typeof Government, player: Player) => {
          const playerResearch = playerResearchRegistry.getByPlayer(player);

          return playerResearch.completed(RequiredAdvance);
        })
      )
  ),
];

export default getRules;
