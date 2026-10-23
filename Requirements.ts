import {
  Communism as CommunismAdvance,
  Democracy as DemocracyAdvance,
  Monarchy as MonarchyAdvance,
  TheRepublic,
} from '@civ-clone/library-science/Advances';
import {
  Communism,
  Democracy,
  Despotism,
  Monarchy,
  Republic,
} from './Governments';
import { Requirement, table } from '@civ-clone/core-requirement/Requirement';

// What Civilization's governments need before a player may choose them, as the entries
//  `Rules/Governments/availability` makes its rules from (civ-clone/web-renderer#37). `registerRules` adds them to the
//  game's `requirements`.

/**
 * The advance a player needs before it may choose each government: one rule each. Despotism needs none, so it is
 * always available. A government is available by any rule that allows it, so each entry is one way to it: the
 * Pyramids' way is a rule of `civ1-wonder`'s own.
 */
export const availability: Requirement[] = table(
  'civ1-government:governments/availability',
  'requires',
  [
    [Despotism],
    [Communism, CommunismAdvance],
    [Democracy, DemocracyAdvance],
    [Monarchy, MonarchyAdvance],
    [Republic, TheRepublic],
  ]
);

export default availability;
