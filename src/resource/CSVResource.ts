import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export interface CsvObject {
  getCsvAttributes(): (string | number)[];
}

export class CSVResource {
  private static readonly BASE_PATH = 'public';
  private static readonly OUTPUT_PATH = 'public/answers';

  static bills(): Record<string, string>[] {
    return this.read(join(this.BASE_PATH, 'bills.csv'));
  }

  static legislators(): Record<string, string>[] {
    return this.read(join(this.BASE_PATH, 'legislators.csv'));
  }

  static votes(): Record<string, string>[] {
    return this.read(join(this.BASE_PATH, 'votes.csv'));
  }

  static voteResults(): Record<string, string>[] {
    return this.read(join(this.BASE_PATH, 'vote_results.csv'));
  }

  private static read(filename: string): Record<string, string>[] {
    const fileContent = readFileSync(filename, 'utf-8');
    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
  }

  static saveCsv(filename: string, columns: string[], objects: CsvObject[]): string {
    mkdirSync(this.OUTPUT_PATH, { recursive: true });
    const outputFile = join(this.OUTPUT_PATH, filename);

    const records = objects.map(obj => obj.getCsvAttributes());
    const csv = stringify([columns, ...records]);

    writeFileSync(outputFile, csv, 'utf-8');
    return outputFile;
  }
}
