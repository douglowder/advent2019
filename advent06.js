// const input = 'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L';

const fs = require('fs');

const input = fs.readFileSync('./input06.txt', 'utf8');

// const input =
//  'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN';

const buildTree = input => {
  const orbits = input.trim().split('\n');
  const keys = new Set();
  const map = {};
  for (let i in orbits) {
    const [parent, child] = orbits[i].split(')');
    if (!keys.has(parent)) {
      keys.add(parent);
      map[parent] = { value: parent };
    }
    if (!keys.has(child)) {
      keys.add(child);
      map[child] = { value: child };
    }
    map[child].parent = map[parent];
  }
  return {
    keys,
    map
  };
};

const countOrbits = tree => {
  const { keys, map } = tree;
  let count = 0;
  for (let key of keys) {
    let child = map[key];
    while (child.parent) {
      count = count + 1;
      child = child.parent;
    }
  }
  return count;
};

const minTransfers = tree => {
  const { keys, map } = tree;
  const santachain = [];
  const youchain = [];
  let s = map['SAN'];
  while (s) {
    santachain.push(s.value);
    s = s.parent;
  }
  let y = map['YOU'];
  while (y) {
    youchain.push(y.value);
    y = y.parent;
  }
  while (youchain[youchain.length - 1] === santachain[santachain.length - 1]) {
    youchain.pop();
    santachain.pop();
  }
  return youchain.length + santachain.length - 2;
};

console.log('Part 1: ' + countOrbits(buildTree(input)));
console.log('Part 2: ' + minTransfers(buildTree(input)));
