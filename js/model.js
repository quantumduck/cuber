function addPoints(collection, newPoints) {

}

function drawPoint(drawing, points) {

}

function newPoint(x, y, z) {
  return {
    x: x,
    y: y,
    z: z,
    greaterThan: function(point) {
      if (this.x > point.x) {
        return true;
      } else if (this.y < point.y) {
        return true;
      } else if (this.z > point.z) {
        return true;
      } else {
        return false;
      }
    },
    equals: function(point) {
      if (this.x !== point.x) {
        return false;
      } else if (this.y !== point.y) {
        return false;
      } else if (this.z !== point.z) {
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
    }
  }
}

function drawCollection(collection) {
  var offset = [0,0];
  var drawing = [[]];
  for (var k = 0; k < collection.length; k++) {
    var nextPoint = projection(collection[k]);
    var row = nextPoint.row + offset[0];
    var col = nextPoint.col + offset[1];
    // Set offsets so that row and column are positive:
    if (row < 0) {
      for (var j = 0; j < drawing.length; j++) {
        for (var i = 0; i <= -row; i++) {
          drawing[0].unshift(' ');
        }
      }
      offset[0] -= row;
      row = 0;
    }
    // Set offsets so that row and column are positive:
    if (col < 0) {
      var blankRow = [];
      for (var i = 0; i < drawing[0].length; i++) {
        blankRow.push(' ');
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
          drawing[0].push(' ');
        }
      }
    }
    if (col >= drawing.length - 3) {
      var blankRow = [];
      for (var i = 0; i < drawing[0].length; i++) {
        blankRow.push(' ');
      }
      for (var j = 0; j < col + 3 - drawing.length; j++) {
        drawing.push(blankRow);
      }
    }
    // Finally, add in the point:
    drawing[col][row] = '\\';
    drawing[col][row + 1] = '/';
    drawing[col[row + 2] = '_';
    drawing[col][row + 3] = '/';
    drawing[col + 1][row] = '/';
    drawing[col + 1][row + 1] = '\\';
    drawing[col + 1][row + 2] = '_';
    drawing[col + 1][row + 3] = '\\';
    if (drawing [col + 2][row + 2] === ' ') {
      drawing[col + 2][row + 2] = '_';
    } else if (draing[col + 2][row + 1] === ' ') {
      drawing[col + 2][row + 1] = '_';
    }
  }
}
