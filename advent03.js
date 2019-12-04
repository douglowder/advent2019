// const input = 'R8,U5,L5,D3\n\
// U7,R6,D4,L4';

const fs = require('fs');

const input = fs.readFileSync('./input03.txt', 'utf8');

const input1 = input.split('\n')[0].split(',');
const input2 = input.split('\n')[1].split(',');

const directionMap = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1]
};

const constructWire = a => {
  const wire = [];
  const pos = [0, 0, 0];
  for (let i in a) {
    const direction = directionMap[a[i].substring(0, 1)];
    const distance = parseInt(a[i].substring(1));
    for (let j = 0; j < distance; j++) {
      wire.push([...pos]);
      pos[0] = pos[0] + direction[0];
      pos[1] = pos[1] + direction[1];
      pos[2] = pos[2] + 1; // steps
    }
  }
  return wire;
};

const key = pos => 1000000 * pos[0] + pos[1];

const compare1 = (a, b) =>
  Math.abs(a[0]) + Math.abs(a[1]) - Math.abs(b[0]) - Math.abs(b[1]);

const compare2 = (a, b) => a[2] - b[2];

const findIntersections = (wire1, wire2) => {
  const set1 = new Set();
  const map1 = {};
  for (let i = 1; i < wire1.length; i++) {
    set1.add(key(wire1[i]));
    map1[key(wire1[i])] = wire1[i];
  }
  let intersections = [];
  for (let j = 1; j < wire2.length; j++) {
    if (set1.has(key(wire2[j]))) {
      intersections.push(
        [wire2[j][0], wire2[j][1], map1[key(wire2[j])][2] + wire2[j][2]] // x, y, and steps of wire1 + steps of wire2
      );
    }
  }
  return intersections;
};

const wire1 = constructWire(input1);
const wire2 = constructWire(input2);
let intersections = findIntersections(wire1, wire2, compare1);
intersections.sort(compare1);
console.log(
  'Part 1: ' + (Math.abs(intersections[0][0]) + Math.abs(intersections[0][1]))
);
intersections.sort(compare2);
console.log('Part 2: ' + intersections[0][2]);
