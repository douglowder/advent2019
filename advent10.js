const fs = require('fs');

const input = fs.readFileSync('./input10.txt', 'utf8');

const key = (x, y) => `${x}X${y}`;

const createMap = input => {
  const rows = input.split('\n');
  const height = rows.length;
  const width = rows[0].length;
  const asteroids = new Set();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (rows[y].substring(x, x + 1) === '#') {
        asteroids.add(key(x, y));
      }
    }
  }
  return {
    height,
    width,
    asteroids
  };
};

const isVisible = (asteroidmap, key1, key2) => {
  const [x1, y1] = key1.split('X').map(n => parseInt(n));
  const [x2, y2] = key2.split('X').map(n => parseInt(n));
  if (x1 === x2) {
    let ymin, ymax;
    if (y1 > y2) {
      ymin = y2;
      ymax = y1;
    } else {
      ymin = y1;
      ymax = y2;
    }
    for (let y = ymin + 1; y < ymax; y++) {
      if (asteroidmap.has(key(x1, y))) {
        return false;
      }
    }
    return true;
  } else if (y1 === y2) {
    let xmin, xmax;
    if (x1 > x2) {
      xmin = x2;
      xmax = x1;
    } else {
      xmin = x1;
      xmax = x2;
    }
    for (let x = xmin + 1; x < xmax; x++) {
      if (asteroidmap.has(key(x, y1))) {
        return false;
      }
    }
    return true;
  } else {
    let xmin, xmax;
    if (x1 > x2) {
      xmin = x2;
      xmax = x1;
    } else {
      xmin = x1;
      xmax = x2;
    }

    const slope = (y2 - y1) / (x2 - x1);
    for (let x = xmin + 1; x < xmax; x++) {
      const y = y1 + slope * (x - x1);
      if (asteroidmap.has(key(x, y))) {
        return false;
      }
    }
    return true;
  }
};

const neighbors = (asteroidmap, key) => {
  asteroidmap.delete(key);
  let count = 0;
  asteroidmap.forEach(value => {
    if (isVisible(asteroidmap, key, value)) {
      count = count + 1;
    }
  });
  asteroidmap.add(key);
  return count;
};

const bestlocation = asteroidmap => {
  const keys = Array.from(asteroidmap);
  let max = 0;
  let location = '';
  for (let i = 0; i < keys.length; i++) {
    const n = neighbors(asteroidmap, keys[i]);
    if (n > max) {
      location = keys[i];
      max = n;
    }
  }
  return {
    location,
    max
  };
};

const mymap = createMap(input);

console.log(mymap.height);

console.log(bestlocation(mymap.asteroids));
