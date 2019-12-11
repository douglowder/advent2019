const fs = require('fs');

const input = fs.readFileSync('./input07.txt', 'utf8');

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
      state[state[pos + 1]] = inp.length > 0 ? inp.shift() : 0;
      return pos + 2;
    case 4:
      p1 = immediate[0] ? state[pos + 1] : state[state[pos + 1]];
      out.unshift(p1);
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

const compute = (state, inp) => {
  let out = [];
  let pos = state[state.length - 1];
  while (state[pos] !== 99 || out.length === 0) {
    pos = executeOpcode(state, pos, inp, out);
  }
  state[state.length - 1] = pos;
  return out.length > 0 ? out[0] : -99;
};

const initialState = () => {
  const state = input
    .trim()
    .split(',')
    .map(n => parseInt(n));
  return [...state, 0];
};

const amplify1 = phases => {
  let out = 0;
  while (phases.length > 0) {
    out = compute(initialState(), [phases[0], out]);
    phases.shift();
  }
  return out;
};

const permutator = inputArr => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

let maxResult = 0;

const allPhaseSettings = permutator([0, 1, 2, 3, 4]);

for (let i in allPhaseSettings) {
  const result = amplify1(allPhaseSettings[i]);
  if (result > maxResult) {
    maxResult = result;
  }
}

console.log('Part 1: ' + maxResult);
