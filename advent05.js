const fs = require('fs');

const input = fs.readFileSync('./input05.txt', 'utf8');

// const input = '1002,4,3,4,33';

const intcode = require('./intcode');

const compute = inp => {
  const computer = intcode.initialize(input);
  computer.stopOnOutput = false;
  return intcode.compute(computer, [inp]);
};

console.log('Part 1: ' + compute(1));

console.log('Part 2: ' + compute(5));
