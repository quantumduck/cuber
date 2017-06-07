function newITet(x, y, z, orientation) {
  var type = "I-tetronimo";
  var point = {x: x, y: y, z: z};
  var tetronimo =  newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x, y, z + 2, type),
    newCube(x, y, z + 3, type)
  ]);
  return tetronimo;
}

function newLTet(x, y, z, orientation) {
  var type = "L-tetronimo";
  var tetronimo =  newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x, y, z + 2, type),
    newCube(x + 1, y, z, type)
  ]);
  return tetronimo;
}

function newOTet(x, y, z, orientation) {
  var type = "O-tetronimo";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x + 1, y, z, type),
    newCube(x + 1, y, z + 1, type)
  ]);
}

function newTTet(x, y, z, orientation) {
  var type = "T-tetronimo";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x + 1, y, z, type),
    newCube(x - 1, y, z, type)
  ]);
}

function newZTet(x, y, z, orientation) {
  var type = "Z-tetronimo";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x + 1, y, z + 1, type),
    newCube(x + 1, y, z + 2, type)
  ]);
}

function newTriTet(x, y, z, orientation) {
  var type = "tripod-tetronimo";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x + 1, y, z, type),
    newCube(x, y + 1, z, type)
  ]);
}

function newWeirdTet1(x, y, z, orientation) {
  var type = "weird-tetronimo-1";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y + 1, z, type),
    newCube(x + 1, y, z, type),
    newCube(x + 1, y, z + 1, type)
  ]);
}

function newWeirdTet2(x, y, z, orientation) {
  var type = "weird-tetronimo-2";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y + 1, z, type),
    newCube(x + 1, y, z, type),
    newCube(x, y + 1, z + 1, type)
  ]);
}

function newRandomTet() {
  var rand = Math.random() * 24 * 8;
  var type = Math.floor(rand / 24);
  var orientation = Math.floor(rand % 24);
  var tetro;
  switch (type) {
    case 0:
      tetro = newITet(0,0,20);
      break;
    case 1:
      tetro = newLTet(0,0,20);
      break;
    case 2:
      tetro = newOTet(0,0,20);
      break;
    case 3:
      tetro = newTTet(0,0,20);
      break;
    case 4:
      tetro = newZTet(0,0,20);
      break;
    case 5:
      tetro = newTriTet(0,0,20);
      break;
    case 6:
      tetro = newWeirdTet1(0,0,20);
      break;
    case 7:
      tetro = newWeirdTet2(0,0,20);
      break;
  }
  switch (orientation / 6) {
    case 1:
      tetro = rotateCollection(tetro, 'z');
    case 2:
      tetro = rotateCollection(tetro, 'z');
      break;
    case 3:
      tetro = rotateCollection(tetro, '-z');
      break;
  }
  switch (orientation % 6) {
    case 1:
      tetro = rotateCollection(tetro, 'x');
    case 2:
      tetro = rotateCollection(tetro, 'x');
      break;
    case 3:
      tetro = rotateCollection(tetro, '-x');
      break;
    case 4:
      tetro = rotateCollection(tetro, 'y');
      break;
    case 5:
      tetro = rotateCollection(tetro, '-y');
      break;
  }
  return tetro;
}
