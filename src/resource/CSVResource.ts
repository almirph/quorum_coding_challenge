import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { IResource } from './IResource.js';

export interface CsvObject {
  getCsvAttributes(): (string | number)[];
}

export class CSVResource implements IResource {
  private readonly BASE_PATH = 'public';
  private readonly OUTPUT_PATH = 'public/answers';

  bills(): Record<string, string>[] {
    return this.read(join(this.BASE_PATH, 'bills.csv'));
  }

  legislators(): Record<string, string>[] {
    return this.read(join(this.BASE_PATH, 'legislators.csv'));
  }

  votes(): Record<string, string>[] {
    return this.read(join(this.BASE_PATH, 'votes.csv'));
  }

  voteResults(): Record<string, string>[] {
    return this.read(join(this.BASE_PATH, 'vote_results.csv'));
  }

  private read(filename: string): Record<string, string>[] {
    const fileContent = readFileSync(filename, 'utf-8');
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
  }

  saveCsv(filename: string, columns: string[], objects: CsvObject[]): string {
    mkdirSync(this.OUTPUT_PATH, { recursive: true });
    const outputFile = join(this.OUTPUT_PATH, filename);

    const records = objects.map(obj => obj.getCsvAttributes());
    const csv = stringify([columns, ...records]);

    writeFileSync(outputFile, csv, 'utf-8');
    return outputFile;
  }
}
