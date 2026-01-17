import { Bill } from '../models/Bill.js';
import { Legislator } from '../models/Legislator.js';
import { Vote } from '../models/Vote.js';
import { VoteResult } from '../models/VoteResult.js';

describe('Bill', () => {
  beforeEach(() => {
    Bill.clearAll();
    Legislator.clearAll();
    Vote.clearAll();
    VoteResult.clearAll();
  });

  test('creation and storage', () => {
    const bill1 = new Bill('b1', 'Bill 1', 's1');
    const bill2 = new Bill('b2', 'Bill 2', 's2');

    expect(bill1.id).toBe('b1');
    expect(bill1.title).toBe('Bill 1');
    expect(Bill.all()).toHaveLength(2);
    expect(Bill.findById('b1')).toBe(bill1);
    expect(Bill.findById('b999')).toBeUndefined();
  });

  test('vote counting', () => {
    const bill = new Bill('b1', 'Test', 's1');
    new Vote('v1', 'b1');

    expect(bill.supporterCount()).toBe(0);
    expect(bill.opposerCount()).toBe(0);

    new VoteResult('vr1', 'l1', 'v1', 1);
    new VoteResult('vr2', 'l2', 'v1', 1);
    new VoteResult('vr3', 'l3', 'v1', 2);

    expect(bill.supporterCount()).toBe(2);
    expect(bill.opposerCount()).toBe(1);
  });

  test('primary sponsor', () => {
    new Legislator('s1', 'John');
    const bill1 = new Bill('b1', 'Test', 's1');
    const bill2 = new Bill('b2', 'Test', 's999');

    expect(bill1.primarySponsor()).toBe('John');
    expect(bill2.primarySponsor()).toBe('Unknown');
  });

  test('csv attributes', () => {
    new Legislator('s1', 'John');
    const bill = new Bill('b1', 'Test', 's1');
    new Vote('v1', 'b1');
    new VoteResult('vr1', 'l1', 'v1', 1);
    new VoteResult('vr2', 'l2', 'v1', 2);

    const attrs = bill.getCsvAttributes();
    expect(attrs).toEqual(['b1', 'Test', 1, 1, 'John']);
  });
});
