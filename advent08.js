const fs = require('fs');

const input = fs
  .readFileSync('./input08.txt', 'utf8')
  .trim()
  .split('')
  .map(n => parseInt(n));

const WIDTH = 25;
const HEIGHT = 6;

const layerSize = WIDTH * HEIGHT;

let layers = [];
let currentLayer;

for (let i in input) {
  if (i % layerSize === 0) {
    currentLayer = [];
    layers.push(currentLayer);
  }
  currentLayer.push(input[i]);
}

for (let i in layers) {
  let sums = [0, 0, 0];
  for (let j in layers[i]) {
    if (layers[i][j] === 0) {
      sums[0] = sums[0] + 1;
    }
    if (layers[i][j] === 1) {
      sums[1] = sums[1] + 1;
    }
    if (layers[i][j] === 2) {
      sums[2] = sums[2] + 1;
    }
  }
  layers[i] = [...sums, ...layers[i]];
}

let index = 0;
let min = 99999999999;

for (let i = 0; i < layers.length; i++) {
  if (layers[i][0] < min) {
    index = i;
    min = layers[i][0];
  }
}

console.log('Part 1: ' + layers[index][1] * layers[index][2]);

const image = [];

for (let j = 0; j < HEIGHT; j++) {
  const row = [];
  for (let i = 0; i < WIDTH; i++) {
    let pixel = '';
    const index = j * WIDTH + i;
    for (let k = 0; k < layers.length; k++) {
      if (layers[k][index + 3] === 0) {
        pixel = ' ';
        break;
      } else if (layers[k][index + 3] === 1) {
        pixel = '*';
        break;
      }
    }
    row.push(pixel);
  }
  image.push(row.join(''));
}

console.log('Part 2: ');
console.log(image.join('\n'));
