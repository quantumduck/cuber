function addCubes(collection, newCubes) {
  var newCollection = collection;
  for (var k = 0; k < newCubes.length; k++) {
    var index = newCollection.length;
    while(newCubes[k].greaterThan(collection[index - 1])) {
      index--;
    }
    for (var i = collection.length; i > index; i--) {
      // Shift cubes over:
      newCollection[i] = newCollection[i - 1];
    }
    newCollection[index] = newCubes[k];
  }
}

function newCube(x, y, z) {
  return {
    x: x,
    y: y,
    z: z,
    greaterThan: function(cube) {
      if(!cube) {
        return false;
      }
      if (this.x > cube.x) {
        return true;
      } else if (this.y < cube.y) {
        return true;
      } else if (this.z > cube.z) {
        return true;
      } else {
        return false;
      }
    },
    equals: function(cube) {
      if (!cube) {
        return false;
      }
      if (this.x !== cube.x) {
        return false;
      } else if (this.y !== cube.y) {
        return false;
      } else if (this.z !== cube.z) {
        return false;
      } else {
        return true;
      }
    },
    projection: function() {
      return {
        row: this.x + this.z - (2 * this.y),
        col: this.z - this.x
      }
    },
    rotateX(centreCube, clockwise) {
      var roated = this;
      if (!centreCube) {
        centreCube = { x: 0, y: 0, z: 0 };
      }
      if (clockwise) {
        rotated.y = centreCube.y + (this.z - centreCube.z);
        rotated.z = centreCube.z - (this.y - centreCube.y);
      } else {
        rotated.y = centreCube.y - (this.z - centreCube.z);
        rotated.z = centreCube.z + (this.y - centreCube.y);
      }
      return rotated;
    },
    rotateY(centreCube, clockwise) {
      var roated = this;
      if (!centreCube) {
        centreCube = { x: 0, y: 0, z: 0 };
      }
      if (clockwise) {
        rotated.x = centreCube.x - (this.z - centreCube.z);
        rotated.z = centreCube.z + (this.x - centreCube.x);
      } else {
        rotated.x = centreCube.x + (this.z - centreCube.z);
        rotated.z = centreCube.z - (this.x - centreCube.x);
      }
      return rotated;
    },
    rotateZ(centreCube, clockwise) {
      var roated = this;
      if (!centreCube) {
        centreCube = { x: 0, y: 0, z: 0 };
      }
      if (clockwise) {
        rotated.y = centreCube.y - (this.x - centreCube.x);
        rotated.x = centreCube.x + (this.y - centreCube.y);
      } else {
        rotated.y = centreCube.y + (this.x - centreCube.x);
        rotated.x = centreCube.x - (this.y - centreCube.y);
      }
      return rotated;
    }
  }
}

function drawCollection(collection) {
  var offset = [0,0];
  var drawing = [[]];
  for (var k = 0; k < collection.length; k++) {
    var nextCube = projection(collection[k]);
    var row = nextCube.row + offset[0];
    var col = nextCube.col + offset[1];
    // Set offsets so that row and column are positive:
    if (row < 0) {
      for (var j = 0; j < drawing.length; j++) {
        for (var i = 0; i <= -row; i++) {
          drawing[0].unshift('&nbsp;');
        }
      }
      offset[0] -= row;
      row = 0;
    }
    // Set offsets so that row and column are positive:
    if (col < 0) {
      var blankRow = [];
      for (var i = 0; i < drawing[0].length; i++) {
        blankRow.push('&nbsp;');
      }
      for (var j = 0; j <= -col; j++) {
        drawing.unshift(blankRow);
      }
      offset[1] -= col;
      col = 0;
    }
    // Ensure the array is large enough:
    if (row >= drawing[0].length - 4) {
      for (var j = 0; j < collection.length; j++) {
        for (var i = 0; i < row + 4 - drawing[0].length; i++) {
          drawing[0].push('&nbsp;');
        }
      }
    }
    if (col >= drawing.length - 3) {
      var blankRow = [];
      for (var i = 0; i < drawing[0].length; i++) {
        blankRow.push('&nbsp;');
      }
      for (var j = 0; j < col + 3 - drawing.length; j++) {
        drawing.push(blankRow);
      }
    }
    // Finally, add in the cube:
    drawing[col][row] = '\\';
    drawing[col][row + 1] = '/';
    drawing[col[row + 2] = '_';
    drawing[col][row + 3] = '/';
    drawing[col + 1][row] = '/';
    drawing[col + 1][row + 1] = '\\';
    drawing[col + 1][row + 2] = '_';
    drawing[col + 1][row + 3] = '\\';
    if (drawing [col + 2][row + 2] === '&nbsp;') {
      drawing[col + 2][row + 2] = '_';
    } else if (draing[col + 2][row + 1] === '&nbsp;') {
      drawing[col + 2][row + 1] = '_';
    }
  }
  return drawing.join('<br>').split(',').join('');
}
