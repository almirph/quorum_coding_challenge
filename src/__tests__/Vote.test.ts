import { Vote } from '../models/Vote.js';
import { VoteResult } from '../models/VoteResult.js';

describe('Vote', () => {
  beforeEach(() => {
    Vote.clearAll();
  });

  test('creation and storage', () => {
    const vote1 = new Vote('v1', 'b1');
    const vote2 = new Vote('v2', 'b2');

    expect(vote1.id).toBe('v1');
    expect(vote1.billId).toBe('b1');
    expect(Vote.all()).toHaveLength(2);
    expect(Vote.findById('v1')).toBe(vote1);
    expect(Vote.findById('v999')).toBeUndefined();
  });
});

describe('VoteResult', () => {
  beforeEach(() => {
    VoteResult.clearAll();
  });

  test('creation and type conversion', () => {
    const vr1 = new VoteResult('vr1', 'l1', 'v1', 1);
    const vr2 = new VoteResult('vr2', 'l2', 'v2', '2');

    expect(vr1.id).toBe('vr1');
    expect(vr1.legislatorId).toBe('l1');
    expect(vr1.voteType).toBe(1);
    expect(vr2.voteType).toBe(2);
    expect(typeof vr2.voteType).toBe('number');
  });

  test('support and oppose checks', () => {
    const support = new VoteResult('vr1', 'l1', 'v1', 1);
    const oppose = new VoteResult('vr2', 'l2', 'v2', 2);

    expect(support.isSupport()).toBe(true);
    expect(support.isOppose()).toBe(false);
    expect(oppose.isOppose()).toBe(true);
    expect(oppose.isSupport()).toBe(false);
  });
});
