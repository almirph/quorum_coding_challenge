export interface IResource {
  bills(): Record<string, string>[];
  legislators(): Record<string, string>[];
  votes(): Record<string, string>[];
  voteResults(): Record<string, string>[];
  saveCsv(filename: string, columns: string[], objects: { getCsvAttributes(): (string | number)[] }[]): string;
}
