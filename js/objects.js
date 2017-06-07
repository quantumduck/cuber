function newLongPiece(x, y, z, orientation) {
  var type = "long-piece";
  var point = {x: x, y: y, z: z};
  var piece =  newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x, y, z + 2, type),
    newCube(x, y, z + 3, type)
  ]);
  piece.setOrientation = function(number) {
    switch(number % 3) {
      case 1:
        piece.rotate(point, 'x');
        break;
      case 2:
        piece.rotate(point, 'y');
        break;
    }
  };
  piece.setOrientation(orientation);
  return piece;
}

function newLPiece(x, y, z, orientation) {
  var type = "L-piece";
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

function newSquarePiece(x, y, z, orientation) {
  var type = "square-piece";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x + 1, y, z, type),
    newCube(x + 1, y, z + 1, type)
  ]);
}

function newTPiece(x, y, z, orientation) {
  var type = "T-piece";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x + 1, y, z, type),
    newCube(x - 1, y, z, type)
  ]);
}

function newZigZagPiece(x, y, z, orientation) {
  var type = "zigzag-piece";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x + 1, y, z + 1, type),
    newCube(x + 1, y, z + 2, type)
  ]);
}

function newTripodPiece(x, y, z, orientation) {
  var type = "tripod-piece";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x + 1, y, z, type),
    newCube(x, y + 1, z, type)
  ]);
}

function newWeirdPiece1(x, y, z, orientation) {
  var type = "weird-piece-1";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y + 1, z, type),
    newCube(x + 1, y, z, type),
    newCube(x + 1, y, z + 1, type)
  ]);
}

function newWeirdPiece2(x, y, z, orientation) {
  var type = "weird-piece-2";
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
  
}
