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

function rotateCollection(collection, axis) {
  var bounds = boundaries(collection);
  var clockwise = false;
  if (axis[0] === '-') {
    clockwise = true;
    axis = axis[1];
  }
  switch(axis) {
    case 'x':
      for (var i = 0; i < collection.length; i++) {
        collection[i].rotateX(bounds.min, clockwise);
      }
      if (clockwise) {
        collection.moveRelative(0,0,bounds.max.y - bounds.min.y);
      } else {
        collection.moveRelative(0,bounds.max.z - bounds.min.z, 0);
      }
      break;
    case 'y':
      for (var i = 0; i < collection.length; i++) {
        collection[i].rotateY(bounds.min, clockwise);
      }
      if (clockwise) {
        collection.moveRelative(bounds.max.z - bounds.min.z,0,0);
      } else {
        collection.moveRelative(0,0,bounds.max.x - bounds.min.x);
      }
      break;
    case 'z':
      for (var i = 0; i < collection.length; i++) {
        collection[i].rotateZ(bounds.min, clockwise);
      }
      if (clockwise) {
        collection.moveRelative(0,bounds.max.x - bounds.min.x,0);
      } else {
        collection.moveRelative(bounds.max.y - bounds.min.y,0,0);
      }
      break;
  }
  return newCollection(collection); // reorder everything!
}

// Check for collisions before moving:
function safeMove(activeCubes, x, y, z, staticCubes, bounds) {
  activeCubes.moveRelative(x,y,z);
  if (bounds) {
    for (var j = 0; j < activeCubes.length; j++) {
      if (
        activeCubes[j].x > bounds.max.x ||
        activeCubes[j].x < bounds.min.x ||
        activeCubes[j].y > bounds.max.y ||
        activeCubes[j].y < bounds.min.y ||
        activeCubes[j].z > bounds.max.z ||
        activeCubes[j].z < bounds.min.z
      ) {
        // If any of the above undo the move
        activeCubes.moveRelative(-x,-y,-z);
        return false;
      }
    }
  }
  if (staticCubes) {
    for (var i = 0; i < staticCubes.length; i++) {
      for (var j = 0; j < activeCubes.length; j++) {
        if (staticCubes[i].equals(activeCubes[j])) {
          // reverse the action
          activeCubes.moveRelative(-x,-y,-z);
          return false;
        }
      }
    }
  }
  return true;
}

// Check for collisions before rotating:
function safeRotate(staticCubes, activeCubes, axis) {
  var rotatedCubes = rotateCollection(activeCubes, axis);
  if (axis[0] === '-') {
    for (var i = 0; i < staticCubes.length; i++) {
      for (var j = 0; j < rotatedCubes.length; j++) {
        if (staticCubes[i].equals(rotatedCubes[j])) {
          return activeCubes;
        }
      }
    }
  } else {
    for (var i = 0; i < staticCubes.length; i++) {
      for (var j = 0; j < rotatedCubes.length; j++) {
        if (staticCubes[i].equals(rotatedCubes[j])) {
          return activeCubes;
        }
      }
    }
  }
  return rotatedCubes;
}

function getLayers(collection) {
  // Returns an array of collections for each layer.
  var bounds = boundaries(collection);
  var all_layers = [];
  var zIndex = bounds.min.z;
  var layer = {
    z: zIndex,
    cubes: newCollection([])
  };
  for (var i = 0; i < collection.length; i++) {
    var cube = collection[i];
    if (cube.z !== layer.z) {
      all_layers.push(layer);
      layer = {
        z: cube.z,
        cubes: newCollection([])
      };
    }
    layer.cubes.push(cube);
  }
  all_layers.push(layer);
  return all_layers;
}

function shadow(activeCubes, staticCubes) {
  // Return a shadow showing where the active cubes will fall:
  var shadowCubes = newCollection([]);
  var roomToMove = false;
  for (var i = 0; i < activeCubes.length; i++) {
    shadowCubes.addCube(newCube(
      activeCubes[i].x,
      activeCubes[i].y,
      activeCubes[i].z,
      'shadow'
    ));
  }
  while (safeMove(shadowCubes, 0, 0, -1, staticCubes)) {
    roomToMove = true;
  }
  if (roomToMove) {
    return shadowCubes;
  } else {
    // If active cubes can't move down. Don't return anything.
    return false;
  }
}
