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

// derive address from parameter
const fetch = (computer, pos, mode) => {
  let location;
  switch (mode) {
    case 0: // position mode
    default:
      location = computer.state[pos];
      break;
    case 1: // immediate mode
      location = pos;
      break;
    case 2: // relative mode
      location = computer.rc + computer.state[pos];
      break;
  }
  mallocIfNeeded(computer, location);
  return computer.state[location];
};

// store a value
const store = (computer, pos, val) => {
  mallocIfNeeded(computer, pos);
  computer.state[pos] = val;
};

// extend available memory if needed
const mallocIfNeeded = (computer, pos) => {
  while (pos > computer.state.length) {
    const extension = [];
    extension.length = computer.state.length;
    extension.fill(0);
    computer.state = [...computer.state, ...extension];
  }
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
      store(
        computer,
        mode[2] === 2
          ? computer.rc + computer.state[pos + 3]
          : computer.state[pos + 3],
        p1 + p2
      );
      pos = pos + 4;
      break;
    case 2:
      p1 = fetch(computer, pos + 1, mode[0]);
      p2 = fetch(computer, pos + 2, mode[1]);
      store(
        computer,
        mode[2] === 2
          ? computer.rc + computer.state[pos + 3]
          : computer.state[pos + 3],
        p1 * p2
      );
      pos = pos + 4;
      break;
    case 3:
      store(
        computer,
        mode[0] === 2
          ? computer.rc + computer.state[pos + 1]
          : computer.state[pos + 1],
        computer.inp.length > 0 ? computer.inp.shift() : 0
      );
      pos = pos + 2;
      break;
    case 4:
      p1 = fetch(computer, pos + 1, mode[0]);
      computer.out.push(p1);
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
      store(
        computer,
        mode[2] === 2
          ? computer.rc + computer.state[pos + 3]
          : computer.state[pos + 3],
        p1 < p2 ? 1 : 0
      );
      pos = pos + 4;
      break;
    case 8:
      p1 = fetch(computer, pos + 1, mode[0]);
      p2 = fetch(computer, pos + 2, mode[1]);
      store(
        computer,
        mode[2] === 2
          ? computer.rc + computer.state[pos + 3]
          : computer.state[pos + 3],
        p1 === p2 ? 1 : 0
      );
      pos = pos + 4;
      break;
    case 9:
      p1 = fetch(computer, pos + 1, mode[0]);
      computer.rc = computer.rc + p1;
      pos = pos + 2;
      break;
    default:
      break;
  }
  mallocIfNeeded(computer, pos);
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
  return computer.out.length > 0 ? computer.out[computer.out.length - 1] : -99;
};

module.exports = {
  initialize,
  compute
};
