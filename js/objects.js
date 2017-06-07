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
  var piece =  newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x, y, z + 2, type),
    newCube(x + 1, y, z, type)
  ]);
  piece.setOrientation = function(number) {
    switch(number % 3) {
      case 1:
        piece.rotate(point, 'z');
        break;
      case 2:
        piece.rotate(point, 'z').rotate(point, 'z');
        break;
      case 3:
        piece.rotate(point, 'z')
    }
  };
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

function boundaries(collection) {
  var xmin = collection[0].x;
  var xmax = xmin;
  var ymin = collection[0].y;
  var ymax = ymin;
  var zmin = collection[0].z;
  var zmax = zmin;
  for (var i = 1; i < collection.length; i++) {
    var current = collection[i];
    if (current.x > xmax) {
      xmax = current.x;
    } else if (current.x < xmin) {
      xmin = current.x;
    }
    if (current.y > ymax) {
      ymax = current.y;
    } else if (current.y < ymin) {
      ymin = current.y;
    }
    if (current.z > zmax) {
      zmax = current.z;
    } else if (current.z < zmin) {
      zmin = current.z;
    }
  }
  return {min: {x: xmin, y: ymin, z: zmin}, max: {x: xmax, y: ymax, z: zmax}};
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
      tetro.rotate(tetro[0], 'z');
    case 2:
      tetro.rotate(tetro[0], 'z');
      break;
    case 3:
      tetro.rotate(tetro[0], '-z');
      break;
  }
  switch (orientation % 6) {
    case 1:
      tetro.rotate(tetro[0], 'x');
    case 2:
      tetro.rotate(tetro[0], 'x');
      break;
    case 3:
      tetro.rotate(tetro[0], '-x');
      break;
    case 4:
      tetro.rotate(tetro[0], 'y');
    case 5:
      tetro.rotate(tetro[0], '-y');
      break;
  }
}
