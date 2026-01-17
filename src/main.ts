import { Legislator, Bill, Vote, VoteResult } from './models/index.js';
import { CSVResource } from './resource/index.js';
import { ANSWER_COLUMNS } from './config/answer-columns.js';

function main(): void {

  const legislatorsData = CSVResource.legislators();
  const billsData = CSVResource.bills();
  const votesData = CSVResource.votes();
  const voteResultsData = CSVResource.voteResults();

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

  const legislatorsFile = CSVResource.saveCsv(
    'legislators-support-oppose-count.csv',
    ANSWER_COLUMNS.legislator,
    legislators
  );
  console.log(`  - ${legislatorsFile}`);

  const billsFile = CSVResource.saveCsv(
    'bills.csv',
    ANSWER_COLUMNS.bill,
    bills
  );
  console.log(`  - ${billsFile}`);
}

main();
