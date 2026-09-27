import MandatoryPlayerAction from '@civ-clone/core-player/MandatoryPlayerAction';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';

export { Revolution } from '@civ-clone/library-government/PlayerActions';

/** Offered once a revolution's Anarchy is over, and must be answered before the turn can end. */
export class ChooseGovernment extends MandatoryPlayerAction<PlayerGovernment> {}
