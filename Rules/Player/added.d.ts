import { PlayerGovernmentRegistry } from '@civ-clone/core-government/PlayerGovernmentRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Added from '@civ-clone/core-player/Rules/Added';
export declare const getRules: (
  playerGovernmentRegistry?: PlayerGovernmentRegistry,
  ruleRegistry?: RuleRegistry
) => Added[];
export default getRules;
