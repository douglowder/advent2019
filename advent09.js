const testinputs = [
  '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99',
  '1102,34915192,34915192,7,4,7,99,0',
  '104,1125899906842624,99'
];

const intcode = require('./intcode');

for (let i = 0; i < testinputs.length; i++) {
  const computer = intcode.initialize(testinputs[i]);
  computer.stopOnOutput = false;
  console.log(intcode.compute(computer, []));
}

const fs = require('fs');

const input = fs.readFileSync('./input09.txt', 'utf8');

const computer = intcode.initialize(input);
computer.stopOnOutput = false;
console.log(intcode.compute(computer, [1]));
