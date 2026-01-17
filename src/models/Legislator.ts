import { VoteResult } from './VoteResult.js';

export class Legislator {
  private static _allLegislators: Map<string, Legislator> = new Map();

  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;

    Legislator._allLegislators.set(id, this);
  }

  static findById(legislatorId: string): Legislator | undefined {
    return Legislator._allLegislators.get(legislatorId);
  }

  static all(): Legislator[] {
    return Array.from(Legislator._allLegislators.values());
  }

  static clearAll(): void {
    Legislator._allLegislators.clear();
  }

  getCsvAttributes(): (string | number)[] {
    return [
      this.id,
      this.name,
      this.numSupportedBills(),
      this.numOpposedBills()
    ];
  }

  voteResults(): VoteResult[] {
    return VoteResult.findByLegislatorId(this.id);
  }

  numSupportedBills(): number {
    return this.voteResults().filter(vr => vr.isSupport()).length;
  }

  numOpposedBills(): number {
    return this.voteResults().filter(vr => vr.isOppose()).length;
  }
}
