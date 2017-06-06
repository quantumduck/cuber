function newITet(x, y, z, orientation) {
  var type = "I-tetronimo";
  return newCollection([
    newCube(x, y, z, type),
    newCube(x, y, z + 1, type),
    newCube(x, y, z + 2, type),
    newCube(x, y, z + 3, type)
  ]);

}
