import action from './Rules/Player/action';
import added from './Rules/Player/added';
import anarchyDuration from './Rules/Player/anarchy-duration';
import availability from './Requirements';
import { deriveAvailabilityRules } from './Rules/Governments/availability';
import governmentChanged from './Rules/Player/government-changed';
import { Game, defaultGame } from '@civ-clone/core-game';

export const register = (game: Game): void => {
  game.rules.register(
    ...action(game.playerGovernments, game.pendingEffects, game.turn),
    ...added(game.availableGovernments, game.playerGovernments, game.rules),
    ...anarchyDuration(game.rng)
  );

  // Which governments a player may choose, from the entries in `Requirements`: their rules land where the availability
  //  rules always were, between the rules above and below, so nothing else moves in the order rules run
  //  (civ-clone/web-renderer#37).
  game.requirements.add(
    deriveAvailabilityRules(game.playerResearch),
    ...availability
  );

  game.rules.register(...governmentChanged(game.engine, game.playerWorlds));
};

// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
register(defaultGame);

export default register;
