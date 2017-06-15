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
function safeMove(activeCubes, x, y, z, bounds, staticCubes) {
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

function CompletedLayers(collection, length, width, height) {
  var layers = [];
  for (var k = 0; k < height; k++) {
    var i = 0;
    complete = true;
    while (complete && i < width) {
      var j = 0;
      while (complete && j < length) {
        if (!collection.hasCube(i,j,k)) {
          complete = false;
        }
        j++;
      }
      i++;
    }
    if (complete) {
      layers.push(k);
    }
  }
  return layers;
}

function removeLayers(collection, minimum) {
  var bounds = boundaries(collection);
  var all_layers = [];
  var full_layer = (
      (bounds.max.x - bounds.min.x + 1) *
      (bounds.max.y - bounds.min.y + 1)
  );
  var zShift = 0;

  if (!minimum) {
    minimum = 0;
  }
  for (var i = bounds.min.z; i < bounds.max.z; i++) {
    console.log(i)
    var lastCube = newCube(-1, 10, i + 1);
    var layer = newCollection([]);

    while (lastCube.greaterThan(collection[0])) {
      console.log(collection[0])
      layer.addCube(collection[0]);
      collection.deleteCube(collection[0]);
    }
    all_layers.push(layer);
  }
  all_layers.push(collection);
  for (var i = 0; i < all_layers.length; i++) {
    if (i < minimum) {
      collection.addCubes(all_layers[i]);
    } else if (all_layers[i].length === full_layer) {
      zShift++;
    } else {
      collection.addCubes(all_layers[i].moveRelative(0,0,-zShift));
    }
  }
  return zShift;
}
