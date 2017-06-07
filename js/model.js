function newCollection(cubes) {
  // Take an array of cubes and order it
  var collection = [];
  collection.addCube = function(cube) {
    var index = 0;
    while(cube.greaterThan(this[index])) {
      index++;
    }
    if (cube.equals(this[index])) {
      // skip duplicates
    } else {
      for (var i = collection.length; i > index; i--) {
        // Shift cubes over:
        this[i] = this[i - 1];
      }
      this[index] = cube;
    }
  };
  collection.deleteCube = function(cube) {
    var deleted = false;
    for (var i = 0; i < this.length; i++) {
      if (deleted) {
        this[i] = this[i + 1];
      } else if (cube.equals(this[i])) {
        this[i] = this[i + 1];
        deleted = true;
      }
    }
    this.pop();
  };
  collection.deleteCubes = function(extracubes) {
    for (var k = 0; k < extraCubes.length; k++) {
      this.deleteCube(extraCubes[k]);
    }
  };
  collection.addCubes = function(moreCubes) {
    for (var k = 0; k < moreCubes.length; k++) {
      this.addCube(moreCubes[k]);
    }
  };
  collection.rotate = function(point, axis) {
    var clockwise = false;
    if (axis[0] === '-') {
      clockwise = true;
      axis = axis[1];
    }
    switch(axis) {
      case 'x':
        for (var i = 0; i < this.length; i++) {
          this[i].rotateX(point, clockwise);
        }
        break;
      case 'y':
        for (var i = 0; i < this.length; i++) {
          this[i].rotateY(point, clockwise);
        }
        break;
      case 'z':
        for (var i = 0; i < this.length; i++) {
          this[i].rotateZ(point, clockwise);
        }
        break;
    }
    //collection = newCollection(this); // Reorganize cubes when done rotating.
  };
  collection.addCubes(cubes);
  return collection;
}

function newCube(x, y, z, type) {
  return {
    x: x,
    y: y,
    z: z,
    formatClass: type,
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
        col: this.x + this.z + (2 * this.y),
        row: this.z - this.x
      }
    },
    rotateX(centreCube, clockwise) {
      if (!centreCube) {
        centreCube = { x: 0, y: 0, z: 0 };
      }
      if (clockwise) {
        var temp = centreCube.y + (this.z - centreCube.z);
        this.z = centreCube.z - (this.y - centreCube.y);
        this.y = temp;
      } else {
        var temp = centreCube.y - (this.z - centreCube.z);
        this.z = centreCube.z + (this.y - centreCube.y);
        this.y = temp;
      }
    },
    rotateY(centreCube, clockwise) {
      if (!centreCube) {
        centreCube = { x: 0, y: 0, z: 0 };
      }
      if (clockwise) {
        var temp = centreCube.x - (this.z - centreCube.z);
        this.z = centreCube.z + (this.x - centreCube.x);
        this.x = temp;
      } else {
        var temp = centreCube.x + (this.z - centreCube.z);
        this.z = centreCube.z - (this.x - centreCube.x);
        this.x = temp;
      }
    },
    rotateZ(centreCube, clockwise) {
      if (!centreCube) {
        centreCube = { x: 0, y: 0, z: 0 };
      }
      if (clockwise) {
        var temp = centreCube.y - (this.x - centreCube.x);
        this.x = centreCube.x + (this.y - centreCube.y);
        this.y = temp;
      } else {
        var temp = centreCube.y + (this.x - centreCube.x);
        this.x = centreCube.x - (this.y - centreCube.y);
        this.y = temp;
      }
    }
  }
}

function flattenCollection(collection) {
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
        for (var i = 0; i < -col; i++) {
          drawing[j].unshift(' ');
        }
      }
      offset[0] -= col;
      col = 0;
    }
    // Set offsets so that row and column are positive:
    if (row < 0) {
      for (var j = 0; j < -row; j++) {
        var blankRow = [];
        for (var i = 0; i < drawing[0].length; i++) {
          blankRow.push(' ');
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
          drawing[j].push(' ');
          // console.log(i);
        }
      }
    }
    if (row >= drawing.length - 3) {
      var diff = row - drawing.length + 3;
      for (var j = 0; j < diff; j++) {
        var blankRow = [];
        for (var i = 0; i < drawing[0].length; i++) {
          blankRow.push(' ');
        }
        drawing.push(blankRow);
      }
    }
    // console.log(drawing);
    //Finally, add in the cube:
    drawing[row][col] = '\\' + collection[k].formatClass;
    drawing[row][col + 1] = '/' + collection[k].formatClass;
    drawing[row][col + 2] = '_' + collection[k].formatClass;
    drawing[row][col + 3] = '/' + collection[k].formatClass;
    drawing[row + 1][col] = '/' + collection[k].formatClass;
    drawing[row + 1][col + 1] = '\\' + collection[k].formatClass;
    drawing[row + 1][col + 2] = '_' + collection[k].formatClass;
    drawing[row + 1][col + 3] = '\\' + collection[k].formatClass;
    if (drawing[row + 2][col + 2] === ' ') {
      drawing[row + 2][col + 2] = '_' + collection[k].formatClass;
    } else if (drawing[row + 2][col + 1] === ' ') {
      drawing[row + 2][col + 1] = '_' + collection[k].formatClass;
    }
  }
  return drawing.reverse();
}

function drawCollection(collection) {
  var characters = flattenCollection(collection);
  var newHTML = [];
  var currentFormat = '';
  for (var j = 0; j < characters.length; j++) {
    var newLine = '';
    for (var i = 0; i < characters[j].length; i++) {
      var char = characters[j][i];
      if (char === ' ') {
        newLine += '&nbsp;';
      } else if (char.length > 1) {
        var newFormat = char.substring(1, char.length);
        if (currentFormat) {
          if (currentFormat !== newFormat) {
            newLine += '</span><span class="' + newFormat + '">';
          }
        } else {
          newLine += '<span class="' + newFormat + '">';
        }
        currentFormat = newFormat;
        newLine += char[0];
      } else {
        newLine += char[0];
      }
    }
    if (currentFormat) {
      newLine += '</span>';
      currentFormat = '';
    }
    newHTML.push(newLine);
  }
  return newHTML.join('<br>');
}
