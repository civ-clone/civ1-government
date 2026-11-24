import anarchyDuration, {
  CIVIL_DISORDER_TURNS,
  REVOLUTION_TURNS,
} from '../Rules/Player/anarchy-duration';
import { Anarchy } from '../Governments';
import { expect } from 'chai';

// What leads to Anarchy and for how long, for the Civilopedia (civ-clone/web-renderer#621): the turns each rule rolls.
describe('anarchy duration', (): void => {
  it('says a revolution leads to 1 to 4 turns of Anarchy, and a Democracy overthrown 2 to 8, as it rolls', (): void => {
    const [chosen, disorder] = anarchyDuration(() => 0);

    expect(chosen.descriptions()).to.eql([
      {
        type: 'anarchy_follows',
        subject: Anarchy,
        cause: 'chosen',
        min: 1,
        max: 4,
      },
    ]);
    expect(disorder.descriptions()).to.eql([
      {
        type: 'anarchy_follows',
        subject: Anarchy,
        cause: 'civil-disorder',
        min: 2,
        max: 8,
      },
    ]);

    // The rolls stay within what they say: the lowest roll and the highest.
    [
      [REVOLUTION_TURNS, 0],
      [REVOLUTION_TURNS, 0.999],
      [CIVIL_DISORDER_TURNS, 0],
      [CIVIL_DISORDER_TURNS, 0.999],
    ].forEach(([[min, max], roll]: any, i: number): void => {
      const [rule] = anarchyDuration(() => roll).slice(i < 2 ? 0 : 1);

      expect(rule.process({} as never, 'chosen')).to.equal(
        roll === 0 ? min : max
      );
    });
  });
});
