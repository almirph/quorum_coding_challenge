import { Legislator, Bill, Vote, VoteResult } from './models/index.js';
import { CSVResource, IResource } from './resource/index.js';
import { ANSWER_COLUMNS } from './config/answer-columns.js';

function main(): void {
  
  const resource: IResource = new CSVResource();

  const legislatorsData = resource.legislators();
  const billsData = resource.bills();
  const votesData = resource.votes();
  const voteResultsData = resource.voteResults();

  const legislators = legislatorsData.map(
    leg => new Legislator(leg.id, leg.name)
  );

  const bills = billsData.map(
    bill => new Bill(bill.id, bill.title, bill.sponsor_id)
  );

  votesData.forEach(
    vote => new Vote(vote.id, vote.bill_id)
  );

  voteResultsData.forEach(
    vr => new VoteResult(vr.id, vr.legislator_id, vr.vote_id, vr.vote_type)
  );

  const legislatorsFile = resource.saveCsv(
    'legislators-support-oppose-count.csv',
    ANSWER_COLUMNS.legislator,
    legislators
  );
  console.log(`  - ${legislatorsFile}`);

  const billsFile = resource.saveCsv(
    'bills.csv',
    ANSWER_COLUMNS.bill,
    bills
  );
  console.log(`  - ${billsFile}`);
}

main();
