import { Anarchy } from '../../Governments';
import Effect from '@civ-clone/core-rule/Effect';
import { REVOLUTION } from '../../lib/revolution';
import RevolutionTerms from '@civ-clone/base-government-change/Rules/RevolutionTerms';
import { terms } from '@civ-clone/base-government-change/lib/terms';

// This package's revolution, for code outside it (a computer player) that starts and finishes revolutions through
//  base-government-change's `lib/revolution`: the save key and Anarchy that `lib/revolution` here passes it.
export const getRules: () => RevolutionTerms[] = (): RevolutionTerms[] => [
  new RevolutionTerms(
    'civ1-government:player/revolution-terms',
    new Effect(terms(REVOLUTION, Anarchy))
  ),
];

export default getRules;
