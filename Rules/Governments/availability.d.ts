import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import Availability from '@civ-clone/core-government/Rules/Availability';
export declare const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry
) => Availability[];
export default getRules;
