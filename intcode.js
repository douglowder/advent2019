// initialize a new IntCode computer and load a program
const initialize = input => {
  const state = input
    .trim()
    .split(',')
    .map(n => parseInt(n));
  return {
    state,
    pc: 0,
    rc: 0,
    inp: [],
    out: [],
    stopOnOutput: true
  };
};

// evaluate a parameter
const fetch = (computer, pos, mode) => {
  switch (mode) {
    case 0: // position mode
    default:
      return computer.state[computer.state[pos]];
    case 1: // immediate mode
      return computer.state[pos];
    case 2: // relative mode
      return computer.state[computer.rc + computer.state[pos]];
  }
};

const store = (computer, pos, val) => {
  computer.state[pos] = val;
};

// execute one instruction
const executeOpcode = computer => {
  let pos = computer.pc;
  const opcode = computer.state[pos] % 100;
  const mode = [];
  let current = Math.floor(computer.state[pos] / 100);
  while (current > 0) {
    mode.push(current % 10);
    current = Math.floor(current / 10);
  }
  mode.push[0];
  let p1, p2;
  switch (opcode) {
    case 1:
      p1 = fetch(computer, pos + 1, mode[0]);
      p2 = fetch(computer, pos + 2, mode[1]);
      store(computer, computer.state[pos + 3], p1 + p2);
      pos = pos + 4;
      break;
    case 2:
      p1 = fetch(computer, pos + 1, mode[0]);
      p2 = fetch(computer, pos + 2, mode[1]);
      store(computer, computer.state[pos + 3], p1 * p2);
      pos = pos + 4;
      break;
    case 3:
      store(
        computer,
        computer.state[pos + 1],
        computer.inp.length > 0 ? computer.inp.shift() : 0
      );
      pos = pos + 2;
      break;
    case 4:
      p1 = fetch(computer, pos + 1, mode[0]);
      computer.out.unshift(p1);
      pos = pos + 2;
      break;
    case 5:
      p1 = fetch(computer, pos + 1, mode[0]);
      p2 = fetch(computer, pos + 2, mode[1]);
      if (p1 !== 0) {
        pos = p2;
      } else {
        pos = pos + 3;
      }
      break;
    case 6:
      p1 = fetch(computer, pos + 1, mode[0]);
      p2 = fetch(computer, pos + 2, mode[1]);
      if (p1 === 0) {
        pos = p2;
      } else {
        pos = pos + 3;
      }
      break;
    case 7:
      p1 = fetch(computer, pos + 1, mode[0]);
      p2 = fetch(computer, pos + 2, mode[1]);
      store(computer, computer.state[pos + 3], p1 < p2 ? 1 : 0);
      pos = pos + 4;
      break;
    case 8:
      p1 = fetch(computer, pos + 1, mode[0]);
      p2 = fetch(computer, pos + 2, mode[1]);
      store(computer, computer.state[pos + 3], p1 === p2 ? 1 : 0);
      pos = pos + 4;
      break;
    default:
      break;
  }
  computer.pc = pos;
};

// run the computer
const compute = (computer, inp) => {
  computer.inp = inp;
  computer.out = [];

  while (
    computer.state[computer.pc] !== 99 &&
    (!computer.stopOnOutput || computer.out.length === 0)
  ) {
    executeOpcode(computer);
  }
  if (!computer.stopOnOutput) {
    return computer.out; // return all outputs
  }
  return computer.out.length > 0 ? computer.out[0] : -99;
};

module.exports = {
  initialize,
  compute
};
