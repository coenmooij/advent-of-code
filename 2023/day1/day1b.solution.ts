import * as fs from 'fs';
import * as path from 'path';

const NUMBER_REGEX: RegExp = /\d/;
const NEWLINE: string = '\n';
const numberWords: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function convertDigits(line: string, isReversed: boolean = false): string {
  for (let lineIndex: number = 0; lineIndex < line.length; lineIndex++) {
    for (let wordIndex: number = 0; wordIndex < numberWords.length; wordIndex++) {
      let numberWord: string = isReversed
        ? numberWords[wordIndex].split('').reverse().join('')
        : numberWords[wordIndex];
      if (line.indexOf(numberWord) === lineIndex) {
        line = line.replace(numberWord, `${wordIndex + 1}`);
      }
    }
  }
  return line;
}

function getDigits(line: string): number {
  const preparedLine: string = convertDigits(line);
  const firstIndex: number = preparedLine.search(NUMBER_REGEX);

  const reversedLine: string = line.split('').reverse().join('');
  const preparedReversedLine: string = convertDigits(reversedLine, true);
  const secondIndex: number = preparedReversedLine.search(NUMBER_REGEX);

  return Number(preparedLine[firstIndex] + preparedReversedLine[secondIndex]);
}

export function getCalibrationValue(filename: string): number {
  const lines: string[] = fs.readFileSync(path.join(__dirname, filename), 'utf-8').split(NEWLINE);

  return lines
    .map((line: string): number => getDigits(line))
    .reduce((current: number, total: number) => total += current, 0);
}
