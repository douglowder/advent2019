const fs = require('fs');

// const input = '1,9,10,3,2,3,11,0,99,30,40,50';
const input = fs.readFileSync('./input02.txt', 'utf8');

const executeOpcode = (state, pos) => {
  switch (state[pos]) {
    case 1:
      state[state[pos + 3]] = state[state[pos + 1]] + state[state[pos + 2]];
      break;
    case 2:
      state[state[pos + 3]] = state[state[pos + 1]] * state[state[pos + 2]];
      break;
    default:
      break;
  }
  return pos + 4;
};

const compute = (input1, input2) => {
  let pos = 0;
  const state = input
    .trim()
    .split(',')
    .map(n => parseInt(n));

  state[1] = input1;
  state[2] = input2;
  while (state[pos] !== 99) {
    pos = executeOpcode(state, pos);
  }
  return state[0];
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
