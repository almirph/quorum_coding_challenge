import { Legislator } from '../models/Legislator.js';
import { VoteResult } from '../models/VoteResult.js';
import { Vote } from '../models/Vote.js';

describe('Legislator', () => {
  beforeEach(() => {
    Legislator.clearAll();
    VoteResult.clearAll();
    Vote.clearAll();
  });

  test('creation and storage', () => {
    const leg1 = new Legislator('1', 'John');
    const leg2 = new Legislator('2', 'Jane');

    expect(leg1.id).toBe('1');
    expect(leg1.name).toBe('John');
    expect(Legislator.all()).toHaveLength(2);
    expect(Legislator.findById('1')).toBe(leg1);
    expect(Legislator.findById('999')).toBeUndefined();
  });

  test('vote counting', () => {
    const leg = new Legislator('1', 'John');
    new Vote('v1', 'b1');
    new Vote('v2', 'b2');

    expect(leg.numSupportedBills()).toBe(0);
    expect(leg.numOpposedBills()).toBe(0);

    new VoteResult('vr1', '1', 'v1', 1);
    new VoteResult('vr2', '1', 'v2', 1);
    new VoteResult('vr3', '1', 'v1', 2);

    expect(leg.numSupportedBills()).toBe(2);
    expect(leg.numOpposedBills()).toBe(1);
  });

  test('csv attributes', () => {
    const leg = new Legislator('1', 'John');
    new Vote('v1', 'b1');
    new VoteResult('vr1', '1', 'v1', 1);
    new VoteResult('vr2', '1', 'v1', 2);

    const attrs = leg.getCsvAttributes();
    expect(attrs).toEqual(['1', 'John', 1, 1]);
  });
});
