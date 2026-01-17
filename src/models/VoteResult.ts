export class VoteResult {
  private static _allVoteResults: VoteResult[] = [];
  private static _byVoteId: Map<string, VoteResult[]> = new Map();
  private static _byLegislatorId: Map<string, VoteResult[]> = new Map();

  public id: string;
  public legislatorId: string;
  public voteId: string;
  public voteType: number;

  constructor(id: string, legislatorId: string, voteId: string, voteType: number | string) {
    this.id = id;
    this.legislatorId = legislatorId;
    this.voteId = voteId;
    this.voteType = typeof voteType === 'string' ? parseInt(voteType) : voteType;

    VoteResult._allVoteResults.push(this);
    
    if (!VoteResult._byVoteId.has(voteId)) {
      VoteResult._byVoteId.set(voteId, []);
    }
    VoteResult._byVoteId.get(voteId)!.push(this);
    
    if (!VoteResult._byLegislatorId.has(legislatorId)) {
      VoteResult._byLegislatorId.set(legislatorId, []);
    }
    VoteResult._byLegislatorId.get(legislatorId)!.push(this);
  }

  static all(): VoteResult[] {
    return VoteResult._allVoteResults;
  }
  
  static findByVoteId(voteId: string): VoteResult[] {
    return VoteResult._byVoteId.get(voteId) || [];
  }
  
  static findByLegislatorId(legislatorId: string): VoteResult[] {
    return VoteResult._byLegislatorId.get(legislatorId) || [];
  }

  static clearAll(): void {
    VoteResult._allVoteResults = [];
    VoteResult._byVoteId.clear();
    VoteResult._byLegislatorId.clear();
  }

  isSupport(): boolean {
    return this.voteType === 1;
  }

  isOppose(): boolean {
    return this.voteType === 2;
  }
}
