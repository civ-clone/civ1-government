import {
  Communism,
  Democracy,
  Despotism,
  Monarchy,
  Republic,
} from './Governments';
import { instance as availableGovernmentRegistryInstance } from '@civ-clone/core-government/AvailableGovernmentRegistry';

availableGovernmentRegistryInstance.register(
  Communism,
  Democracy,
  Despotism,
  Monarchy,
  Republic
);
