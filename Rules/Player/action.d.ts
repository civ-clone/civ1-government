import { PendingEffectRegistry } from '@civ-clone/core-pending-effect';
import { PlayerGovernmentRegistry } from '@civ-clone/core-government/PlayerGovernmentRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import Action from '@civ-clone/core-player/Rules/Action';
export declare const getRules: (
  playerGovernmentRegistry?: PlayerGovernmentRegistry,
  pendingEffects?: PendingEffectRegistry,
  turn?: Turn
) => Action[];
export default getRules;
