import { getCalibrationValue } from './day1b.solution';

const testValue: number = getCalibrationValue('day1b.test-data.txt');

console.log('Value should be: 281');
console.log('Actual value:', testValue);

const edgeCase: number = getCalibrationValue('day1b.edge-cases.txt');

console.log('Edge Case: Value should be: 21');
console.log('Actual value:', edgeCase);
