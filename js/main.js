window.activeTet = newRandomTet(); // Current tetris piece
window.bounds = {
  max: {
    x: 9,
    y: 9,
    z: 30
  },
  min: {
    x: 0,
    y: 0,
    z: 0
  }
}

function resetCubes() {
  window.allCubes = newCollection([]); // Collection of all cube objects to be
                                      // displayed.
  // Adding background cubes:
  window.allCubes.addCube(newCube(-1,10,20,'bg'));
  window.allCubes.addCube(newCube(10,10,20,'bg'));
  window.allCubes.addCube(newCube(-1,-1,20,'bg'));
  window.allCubes.addCube(newCube(10,-1,20,'bg'));
  for (var i = 0; i < 10; i++) {
    window.allCubes.addCube(newCube(i,10,20,'bg'));
    window.allCubes.addCube(newCube(10,i,20,'bg'));
    window.allCubes.addCube(newCube(i,-1,20,'bg'));
    window.allCubes.addCube(newCube(-1,i,20,'bg'));
    // window.allCubes.addCube(newCube(-1,i,-1,'bg'));
    // window.allCubes.addCube(newCube(i,10,-1,'bg'));
    // window.allCubes.addCube(newCube(-1,10,i,'bg'));
    for (var j = 9; j >= 0; j--) {
      window.allCubes.addCube(newCube(i,j,-1,'bg'));
      // window.allCubes.addCube(newCube(-1,i,j,'bg'));
      // window.allCubes.addCube(newCube(i,10,j,'bg'));
    }
  }
  window.rotateMode = false; // flag for turning on/off rotations
  window.points = 0;
}

resetCubes();

function drawNow(collection) {
  if (!collection) {
    collection = window.allCubes;
  }
  var cubesToDraw = newCollection(collection);
  var activeShadow = shadow(window.activeTet, collection);
  cubesToDraw.addCubes(window.activeTet);
  if (activeShadow) {
    cubesToDraw.addCubes(activeShadow);
  }
  $('#drawing-area').html(drawCollection(cubesToDraw));
  $('#message-box').html(
    "Current Position: (" +
    boundaries(window.activeTet).min.x + ", " +
    boundaries(window.activeTet).min.y + ", " +
    boundaries(window.activeTet).min.z + ")" +
    "<br>" + window.points + " points."
  );
}

function removeFullLayers() {
  // Includes logic to remove full layers and make them flash on and off...
  // A bit long for main.js. will possibly move it later
  var layers = getLayers(window.allCubes);
  var newLayers = [];
  var layerSize = (
    (window.bounds.max.x - window.bounds.min.x + 1) *
    (window.bounds.max.y - window.bounds.min.y + 1)
  );
  var fullLayers = [];
  // hijack layerSize to make game easier
  layerSize = 10;
  for (var i = 1; i < layers.length; i++) {
    console.log(layers[i].cubes.length);
    // Note: index starts at 1 to skip base layer.
    if (layers[i].cubes.length === layerSize) {
      fullLayers.push(layers[i]);
      window.points += layerSize;
    } else if (layers[i].z < 20) {
      newLayers.push(layers[i]);
    }
  }
  if (fullLayers.length > 0) {
    var leftoverCubes = newCollection(window.allCubes);
    for (var j = 0; j < fullLayers.length; j++) {
      console.log(fullLayers[j]);
      leftoverCubes.deleteCubes(fullLayers[j].cubes);
    }
    console.log(newLayers);
    shiftLayersDown(newLayers, 0);
    console.log(newLayers);
    setTimeout(function () {
      drawNow(leftoverCubes);
      setTimeout(function () {
        drawNow(window.allCubes);
        setTimeout(function () {
          drawNow(leftoverCubes);
          setTimeout(function () {
            resetCubes();
            for (var i = 0; i < newLayers.length; i++) {
              window.allCubes.addCubes(newLayers[i].cubes);
            }
            drawNow();
          }, 200);
        }, 200);
      }, 200);
    }, 200);
  } else if (layers[layers.length - 1].z > 20) {
    loseGame();
  }
}

function loseGame() {
  resetCubes();
  window.points = 0;
  drawNow();
}

$(function() {
  drawNow();

  // setInterval(function() {
  //   // Move active piece down, if possible:
  //   if (!safeMove(window.activeTet, 0, 0, -1, window.allCubes, window.bounds)) {
  //     // If it doesn't move, freeze it in place:
  //     window.allCubes.addCubes(window.activeTet);
  //     cubesToDraw = newCollection(window.allCubes);
  //     window.activeTet = newRandomTet();
  //   }
  //   removeFullLayers();
  //   drawNow();
  // }, 1000);

  $(window).on('keydown', function(e) {
    console.log(e.key);
    // Parsing the keyboard
    switch (e.key) {
      case 'a':
        window.activeTet = safeRotate(window.allCubes, window.activeTet, '-z');
        break;
      case 'w':
          window.activeTet = safeRotate(window.allCubes, window.activeTet, '-y');
        break;
      case 'e':
          window.activeTet = safeRotate(window.allCubes, window.activeTet, '-x');
        break;
      case 'd':
          window.activeTet = safeRotate(window.allCubes, window.activeTet, 'z');
        break;
      case 'z':
          window.activeTet = safeRotate(window.allCubes, window.activeTet, 'x');
        break;
      case 'x':
          window.activeTet = safeRotate(window.allCubes, window.activeTet, 'y');
        break;
      case 'PageDown':
        safeMove(window.activeTet, 0, 0, -1, window.allCubes, window.bounds);
        break;
      case 'PageUp':
        safeMove(window.activeTet, 0, 0, 1, window.allCubes, window.bounds);
        break;
      case 'ArrowLeft':
        safeMove(window.activeTet, 0, -1, 0, window.allCubes, window.bounds);
        break;
      case 'ArrowRight':
        safeMove(window.activeTet, 0, 1, 0, window.allCubes, window.bounds);
        break;
      case 'ArrowUp':
        safeMove(window.activeTet, -1, 0, 0, window.allCubes, window.bounds);
        break;
      case 'ArrowDown':
        safeMove(window.activeTet, 1, 0, 0, window.allCubes, window.bounds);
        break;
      case 'End':
        while(safeMove(window.activeTet, 0, 0, -1, window.allCubes, window.bounds)) {
        }
        window.allCubes.addCubes(window.activeTet);
        cubesToDraw = newCollection(window.allCubes);
        window.activeTet = newRandomTet();
        removeFullLayers();
        break;
    }
    drawNow();
  });
});
