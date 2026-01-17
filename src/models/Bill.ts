import { Vote } from './Vote.js';
import { VoteResult } from './VoteResult.js';
import { Legislator } from './Legislator.js';

export class Bill {
  private static _allBills: Map<string, Bill> = new Map();

  public id: string;
  public title: string;
  public sponsorId: string;

  constructor(id: string, title: string, sponsorId: string) {
    this.id = id;
    this.title = title;
    this.sponsorId = sponsorId;

    Bill._allBills.set(id, this);
  }

  static findById(billId: string): Bill | undefined {
    return Bill._allBills.get(billId);
  }

  static all(): Bill[] {
    return Array.from(Bill._allBills.values());
  }

  static clearAll(): void {
    Bill._allBills.clear();
  }

  getCsvAttributes(): (string | number)[] {
    return [
      this.id,
      this.title,
      this.supporterCount(),
      this.opposerCount(),
      this.primarySponsor()
    ];
  }

  billVoteResults(): VoteResult[] {
    const billVotes = Vote.all().filter(vote => vote.billId === this.id);
    
    const results: VoteResult[] = [];
    for (const vote of billVotes) {
      results.push(...VoteResult.findByVoteId(vote.id));
    }
    
    return results;
  }

  supporterCount(): number {
    return this.billVoteResults().filter(vr => vr.isSupport()).length;
  }

  opposerCount(): number {
    return this.billVoteResults().filter(vr => vr.isOppose()).length;
  }

  primarySponsor(): string {
    const sponsor = Legislator.findById(this.sponsorId);
    return sponsor ? sponsor.name : 'Unknown';
  }
}
