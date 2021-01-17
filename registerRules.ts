import { instance as ruleRegistryInstance } from '@civ-clone/core-rule/RuleRegistry';
import action from './Rules/Player/action';
import added from './Rules/Player/added';
import availability from './Rules/Governments/availability';
import governmentChanged from './Rules/Player/government-changed';

ruleRegistryInstance.register(
  ...action(),
  ...added(),
  ...availability(),
  ...governmentChanged()
);
