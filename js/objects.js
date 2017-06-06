function newLongPiece(x, y, z, orientation) {
  var type = "long-piece";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x, y, z + 2, type),
    newCube(x, y, z + 3, type)
  ]);
}

function newLPiece(x, y, z, orientation) {
  var type = "L-piece";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x, y, z + 2, type),
    newCube(x + 1, y, z, type)
  ]);
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

function newSPiece(x, y, z, orientation) {
  var type = "S-piece";
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
    newCube(x, y, z + 1, type),
    newCube(x + 1, y, z, type),
    newCube(x + 1, y + 1, z, type)
  ]);
}

function newWeirdPiece2(x, y, z, orientation) {
  var type = "weird-piece-2";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x + 1, y, z, type),
    newCube(x + 1, y - 1, z, type)
  ]);
}
