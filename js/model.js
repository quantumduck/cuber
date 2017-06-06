function addCubes(collection, newCubes) {
  var newCollection = collection;
  for (var k = 0; k < newCubes.length; k++) {
    var index = 0;
    while(newCubes[k].greaterThan(collection[index])) {
      index++;
      console.log(index);
    }
    for (var i = collection.length; i > index; i--) {
      // Shift cubes over:
      newCollection[i] = newCollection[i - 1];
    }
    newCollection[index] = newCubes[k];
  }
  return newCollection;
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
      } else if (this.y > cube.y) {
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
        col: this.x + this.z - (2 * this.y),
        row: this.z - this.x
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
  // console.log(drawing);
  for (var k = 0; k < collection.length; k++) {
    var nextCube = collection[k].projection();
    var col = nextCube.col + offset[0];
    var row = nextCube.row + offset[1];
    // Set offsets so that row and column are positive:
    if (col < 0) {
      for (var j = 0; j < drawing.length; j++) {
        for (var i = 0; i <= -col; i++) {
          drawing[j].unshift('&nbsp;');
        }
      }
      offset[0] -= col;
      col = 0;
    }
    // Set offsets so that row and column are positive:
    if (row < 0) {
      for (var j = 0; j <= -row; j++) {
        var blankRow = [];
        for (var i = 0; i < drawing[0].length; i++) {
          blankRow.push('&nbsp;');
        }
        drawing.unshift(blankRow);
      }
      offset[1] -= row;
      row = 0;
    }
    // Ensure the array is large enough:
    if (col > drawing[0].length - 4) {
      var diff = col - drawing[0].length + 4;
      for (var j = 0; j < drawing.length; j++) {
        for (var i = 0; i < diff; i++) {
          drawing[j].push('&nbsp;');
          // console.log(i);
        }
      }
    }
    if (row >= drawing.length - 3) {
      var diff = row - drawing.length + 3;
      for (var j = 0; j < diff; j++) {
        var blankRow = [];
        for (var i = 0; i < drawing[0].length; i++) {
          blankRow.push('&nbsp;');
        }
        drawing.push(blankRow);
      }
    }
    // console.log(drawing);
    //Finally, add in the cube:
    drawing[row][col] = '\\';
    drawing[row][col + 1] = '/';
    drawing[row][col + 2] = '_';
    drawing[row][col + 3] = '/';
    drawing[row + 1][col] = '/';
    drawing[row + 1][col + 1] = '\\';
    drawing[row + 1][col + 2] = '_';
    drawing[row + 1][col + 3] = '\\';
    if (drawing[row + 2][col + 2] === '&nbsp;') {
      drawing[row + 2][col + 2] = '_';
    } else if (drawing[row + 2][col + 1] === '&nbsp;') {
      drawing[row + 2][col + 1] = '_';
    }
  }
  return drawing.reverse().join('<br>').split(',').join('');
}
