import {
  Anarchy,
  Communism,
  Democracy,
  Despotism,
  Monarchy,
  Republic,
} from './Governments';
import { instance as availableGovernmentRegistryInstance } from '@civ-clone/core-government/AvailableGovernmentRegistry';

// `Anarchy` is registered so a game saved during one can name it and be
// loaded. No `Availability` rule matches it, so it's never offered as a
// choice.
availableGovernmentRegistryInstance.register(
  Anarchy,
  Communism,
  Democracy,
  Despotism,
  Monarchy,
  Republic
);
