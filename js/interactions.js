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
function safeMove(staticCubes, activeCubes, x, y, z) {
  activeCubes.moveRelative(x,y,z);
  for (var i = 0; i < staticCubes.length; i++) {
    for (var j = 0; j < activeCubes.length; j++) {
      if (staticCubes[i].equals(activeCubes[j])) {
        // reverse the action
        activeCubes.moveRelative(-x,-y,-z);
        return false;
      }
    }
  }
  return true;
}

// Check for collisions before rotating:
function safeRotate(staticCubes, acticeCubes, axis) {
  rotateCollection(activeCubes, axis);
  if (axis[0] === '-') {
    for (var i = 0; i < staticCubes.length; i++) {
      for (var j = 0; j < activeCubes.length; j++) {
        if (staticCubes[i].equals(activeCubes[j])) {
          // reverse the action
          rotateCollection(activeCubes, axis[1]);
          return false;
        }
      }
    }
  } else {
    for (var i = 0; i < staticCubes.length; i++) {
      for (var j = 0; j < activeCubes.length; j++) {
        if (staticCubes[i].equals(activeCubes[j])) {
          // reverse the action
          rotateCollection(activeCubes, '-' + axis);
          return false;
        }
      }
    }
  }
  return true;
}
