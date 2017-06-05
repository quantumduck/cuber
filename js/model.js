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
        col: this.x - this.z
      }
    }
  }
}

function drawCollection(collection) {
  var offset = [0,0];
  var drawing = [[]];
  for (var k = 0; k < collection.length; k++) {
    var nextPoint = projection(collection[k]);
    if (offset[0] + nextPoint.row < 0) {
      for (var j = 0; j < drawing.length; j++) {
        for (var i = 0; i <= offset[0] - nextPoint.row + 2) {
          drawing[0].unshift(' ');

        }
      }
      offset[0] -= nextPoint.row;
    }
    if (offset[1] + nextPoint.col < 0) {
      var blankRow = [];
      for (var i = 0; i < drawing[0].length; i++) {
        blankRow.push(' ');
      }
      for (var j = 0; j <= offset[1] - nextPoint.col; j++) {
        drawing.unshift(blankRow);
      }
    }
    if (nextPoint.row >= drawing[0].length - offset[0]) {
      
    }
  }
}
