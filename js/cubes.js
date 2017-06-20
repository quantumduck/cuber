function newCollection(cubes) {
  // Take an array of cubes and order it
  var collection = [];
  collection.hasCube = function(x, y, z) {
    var cube = newCube(x,y,z);
    for (var i = 0; i < collection.length; i++) {
      if (cube.equals(this[i])) {
        return true;
      }
    }
    return false;
  };
  collection.addCube = function(cube) {
    var index = this.length;
    while(index > 0 && cube.lessThan(this[index - 1])) {
      this[index] = this[index - 1];
      index--;
    }
    if (cube.equals(this[index])) {
      // roll back if duplicate:
      this.deleteCube(this[index + 1]);
    } else {
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
  collection.deleteCubes = function(extraCubes) {
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
  };
  collection.moveRelative = function(x, y, z) {
    for (var i = 0; i < this.length; i++) {
      this[i].x += x;
      this[i].y += y;
      this[i].z += z;
    }
  }
  collection.addCubes(cubes);
  return collection;
}

function newCube(x, y, z, type) {
  return {
    x: x,
    y: y,
    z: z,
    formatClass: type,
    // greaterThan: function(cube) {
    //   if(!cube) {
    //     return false;
    //   }
    //   if (this.y < cube.y) {
    //     return true;
    //   } else if (this.z > cube.z) {
    //     return true;
    //   } else if (this.x > cube.x) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    lessThan: function(cube) {
      if(!cube) {
        return false;
      }
      if (this.z < cube.z) {
        return true;
      } else if (this.z > cube.z) {
        return false;
      } else if (this.y > cube.y) {
        return true;
      } else if (this.y < cube.y) {
        return false;
      } else if (this.x < cube.x) {
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
