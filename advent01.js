const fs = require('fs');

const input = fs
  .readFileSync('./input01.txt', 'utf8')
  .trim()
  .split('\n')
  .map(n => parseInt(n));

const fuel1 = n => Math.floor(n / 3) - 2;

const fuel2 = n => {
  if (fuel1(n) <= 0) {
    return 0;
  }
  return fuel1(n) + fuel2(fuel1(n));
};

let sum = 0;

for (let i = 0; i < input.length; i++) {
  sum += fuel1(input[i]);
}

console.log('Part 1 answer = ' + sum);

let sum2 = 0;

for (let i = 0; i < input.length; i++) {
  sum2 += fuel2(input[i]);
}

console.log('Part 2 answer = ' + sum2);
