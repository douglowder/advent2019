const fs = require('fs');

const input = fs.readFileSync('./input05.txt', 'utf8');

// const input = '1002,4,3,4,33';

const executeOpcode = (state, pos, inp, out) => {
  const opcode = state[pos] % 100;
  const immediate = [];
  let current = Math.floor(state[pos] / 100);
  while (current > 0) {
    immediate.push(current % 10 > 0 ? true : false);
    current = Math.floor(current / 10);
  }
  immediate.push[false];
  let p1, p2;
  switch (opcode) {
    case 1:
      p1 = immediate[0] ? state[pos + 1] : state[state[pos + 1]];
      p2 = immediate[1] ? state[pos + 2] : state[state[pos + 2]];
      state[state[pos + 3]] = p1 + p2;
      return pos + 4;
    case 2:
      p1 = immediate[0] ? state[pos + 1] : state[state[pos + 1]];
      p2 = immediate[1] ? state[pos + 2] : state[state[pos + 2]];
      state[state[pos + 3]] = p1 * p2;
      return pos + 4;
    case 3:
      state[state[pos + 1]] = inp;
      return pos + 2;
    case 4:
      p1 = immediate[0] ? state[pos + 1] : state[state[pos + 1]];
      out = p1;
      if (out > 0) {
        console.log('Output = ' + out);
      }
      return pos + 2;
    case 5:
      p1 = immediate[0] ? state[pos + 1] : state[state[pos + 1]];
      p2 = immediate[1] ? state[pos + 2] : state[state[pos + 2]];
      if (p1 !== 0) {
        return p2;
      } else {
        return pos + 3;
      }
    case 6:
      p1 = immediate[0] ? state[pos + 1] : state[state[pos + 1]];
      p2 = immediate[1] ? state[pos + 2] : state[state[pos + 2]];
      if (p1 === 0) {
        return p2;
      } else {
        return pos + 3;
      }
    case 7:
      p1 = immediate[0] ? state[pos + 1] : state[state[pos + 1]];
      p2 = immediate[1] ? state[pos + 2] : state[state[pos + 2]];
      state[state[pos + 3]] = p1 < p2 ? 1 : 0;
      return pos + 4;
    case 8:
      p1 = immediate[0] ? state[pos + 1] : state[state[pos + 1]];
      p2 = immediate[1] ? state[pos + 2] : state[state[pos + 2]];
      state[state[pos + 3]] = p1 === p2 ? 1 : 0;
      return pos + 4;
    default:
      return pos;
  }
};

const compute = inp => {
  let pos = 0;
  const state = input
    .trim()
    .split(',')
    .map(n => parseInt(n));

  let out = 0;
  while (state[pos] !== 99) {
    pos = executeOpcode(state, pos, inp, out);
  }
};

console.log('Part 1:');
compute(1);
console.log('Part 2:');
compute(5);
