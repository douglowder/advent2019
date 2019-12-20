const fs = require('fs');

// const input = '1,9,10,3,2,3,11,0,99,30,40,50';
const input = fs.readFileSync('./input02.txt', 'utf8');

const intcode = require('./intcode');

const compute = (input1, input2) => {
  const computer = intcode.initialize(input);

  computer.state[1] = input1;
  computer.state[2] = input2;

  intcode.compute(computer, []);

  return computer.state[0];
};

console.log('Part 1 answer: ' + compute(12, 2));

let found = false;
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (!found) {
      if (compute(i, j) === 19690720) {
        console.log('Part 2 answer: ' + (100 * i + j));
        found = true;
      }
    }
  }
}
