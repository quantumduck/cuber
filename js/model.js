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
        x: -2 * this.y + this.x + this.z,
        y: this.z - this.x
      }
    }
  }
}

function drawCollection(collection){
  var offset = [0,0];
  var drawing = [[]];
}
