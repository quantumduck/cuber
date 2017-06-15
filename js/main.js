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
window.allCubes = newCollection([]); // Collection of all cube objects to be
                                    // displayed.
// Adding background cubes:
for (var i = 0; i < 10; i++) {
  // window.allCubes.addCube(newCube(-1,i,-1,'bg'));
  // window.allCubes.addCube(newCube(i,10,-1,'bg'));
  // window.allCubes.addCube(newCube(-1,10,i,'bg'));
  for (var j = 0; j < 10; j++) {
    window.allCubes.addCube(newCube(i,j,-1,'bg'));
    // window.allCubes.addCube(newCube(-1,i,j,'bg'));
    // window.allCubes.addCube(newCube(i,10,j,'bg'));
  }
}
window.rotateMode = false; // flag for turning on/off rotations

function drawNow() {
  var cubesToDraw = newCollection(window.allCubes);
  cubesToDraw.addCubes(window.activeTet);
  $('#drawing-area').html(drawCollection(cubesToDraw));
  $('#message-box').html(
    "Current Position (" +
    boundaries(window.activeTet).min.x + ", " +
    boundaries(window.activeTet).min.y + ", " +
    boundaries(window.activeTet).min.z + ")"
  );
}

$(function() {
  drawNow();

  // setInterval(function() {
  //   // Move active piece down, if possible:
  //   if (!safeMove(window.activeTet, 0, 0, -1, window.bounds, window.allCubes)) {
  //     // If it doesn't move, freeze it in place:
  //     window.allCubes.addCubes(window.activeTet);
  //     cubesToDraw = newCollection(window.allCubes);
  //     window.activeTet = newRandomTet();
  //   }
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
        safeMove(window.activeTet, 0, 0, -1, window.bounds, window.allCubes);
        break;
      case 'PageUp':
        safeMove(window.activeTet, 0, 0, 1, window.bounds, window.allCubes);
        break;
      case 'ArrowLeft':
        safeMove(window.activeTet, 0, -1, 0, window.bounds, window.allCubes);
        break;
      case 'ArrowRight':
        safeMove(window.activeTet, 0, 1, 0, window.bounds, window.allCubes);
        break;
      case 'ArrowUp':
        safeMove(window.activeTet, -1, 0, 0, window.bounds, window.allCubes);
        break;
      case 'ArrowDown':
        safeMove(window.activeTet, 1, 0, 0, window.bounds, window.allCubes);
        break;
      case 'End':
        while(safeMove(window.activeTet, 0, 0, -1, window.bounds, window.allCubes)) {
        }
        window.allCubes.addCubes(window.activeTet);
        cubesToDraw = newCollection(window.allCubes);
        window.activeTet = newRandomTet();
        break;
    }
    drawNow();
  });
});
