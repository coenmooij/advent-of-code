import * as fs from 'fs';
import * as path from 'path';

const NUMBER_REGEX: RegExp = /\d/;
const NEWLINE: string = '\n';

function getDigits(line: string): number {
  const firstIndex: number = line.search(NUMBER_REGEX);
  const reversedLine: string = line.split('').reverse().join();
  const secondIndex: number = reversedLine.search(NUMBER_REGEX);

  return Number(line[firstIndex] + reversedLine[secondIndex]);
}

export function getCalibrationValue(filename: string): number {
  const lines: string[] = fs.readFileSync(path.join(__dirname, filename), 'utf-8').split(NEWLINE);

  return lines
    .map((line: string): number => getDigits(line))
    .reduce((current: number, total: number) => total += current, 0);
}
