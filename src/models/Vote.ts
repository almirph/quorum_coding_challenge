export class Vote {
  private static _allVotes: Map<string, Vote> = new Map();

  public id: string;
  public billId: string;

  constructor(id: string, billId: string) {
    this.id = id;
    this.billId = billId;

    Vote._allVotes.set(id, this);
  }

  static findById(voteId: string): Vote | undefined {
    return Vote._allVotes.get(voteId);
  }

  static all(): Vote[] {
    return Array.from(Vote._allVotes.values());
  }

  static clearAll(): void {
    Vote._allVotes.clear();
  }
}
