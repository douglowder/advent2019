const fs = require('fs');

const input = fs
  .readFileSync('./input04.txt', 'utf8')
  .trim()
  .split('-')
  .map(n => parseInt(n));

const numberToDigits = n => {
  const digits = [];
  let m = n;
  while (m > 0) {
    const d = m % 10;
    digits.unshift(d);
    m = Math.floor(m / 10);
  }
  return digits;
};

const digitsToNumber = digits => {
  let n = 0;
  for (let i in digits) {
    n = n * 10;
    n = n + digits[i];
  }
  return n;
};

const isValidPW = n => {
  const digits = numberToDigits(n);
  if (digits.length !== 6) {
    return false;
  }
  let twoAdj = false;
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] > digits[i + 1]) {
      return false;
    }
    if (digits[i] === digits[i + 1]) {
      twoAdj = true;
    }
  }
  return twoAdj;
};

const isValidPW2 = n => {
  const digits = numberToDigits(n);
  if (digits.length !== 6) {
    return false;
  }
  let twoAdj = false;
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] > digits[i + 1]) {
      return false;
    }
    if (
      digits[i] === digits[i + 1] &&
      !(i < 4 && digits[i + 2] === digits[i]) &&
      !(i > 0 && digits[i - 1] === digits[i])
    ) {
      twoAdj = true;
    }
  }
  return twoAdj;
};

let part1sum = 0;
let part2sum = 0;

for (let i = input[0]; i < input[1]; i++) {
  if (isValidPW(i)) {
    part1sum = part1sum + 1;
  }
  if (isValidPW2(i)) {
    part2sum = part2sum + 1;
  }
}

console.log('Part 1: ' + part1sum);
console.log('Part 2: ' + part2sum);
