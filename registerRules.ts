import action from './Rules/Player/action';
import added from './Rules/Player/added';
import availability from './Rules/Governments/availability';
import governmentChanged from './Rules/Player/government-changed';
import { Game, defaultGame } from '@civ-clone/core-game';

export const register = (game: Game): void =>
  game.rules.register(
    ...action(game.playerGovernments),
    ...added(game.availableGovernments, game.playerGovernments, game.rules),
    ...availability(game.playerResearch),
    ...governmentChanged(game.engine, game.playerWorlds)
  );

// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
register(defaultGame);

export default register;
