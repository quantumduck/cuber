window.activeTet = newRandomTet(); // Current tetris piece
window.allCubes = newCollection([]); // Collection of all cube objects to be
                                    // displayed.
// Adding background cubes:
for (var i = 0; i < 10; i++) {
  window.allCubes.addCube(newCube(-1,i,-1,'bg'));
  window.allCubes.addCube(newCube(i,10,-1,'bg'));
  window.allCubes.addCube(newCube(-1,10,i,'bg'));
  for (var j = 0; j < 10; j++) {
    window.allCubes.addCube(newCube(i,j,-1,'bg'));
    window.allCubes.addCube(newCube(-1,i,j,'bg'));
    window.allCubes.addCube(newCube(i,10,j,'bg'));
  }
}
window.rotateMode = false; // flag for turning on/off rotations

$(function() {
  $('#drawing-area').html(drawCollection(window.allCubes));

  $(window).on('keydown', function(e) {
    var cubesToDraw = newCollection(window.allCubes);
    // Parsing the keyboard
    // window.allCubes.deleteCube(window.activeTet);
    switch (e.key) {
      case 's':
        window.allCubes.addCubes(window.activeTet);
        cubesToDraw = newCollection(window.allCubes);
        window.activeTet = newRandomTet();
        break;
      case 'a':
        if (window.rotateMode) {
          window.activeTet = rotateCollection(window.activeTet, '-z');
        } else {
          window.activeTet.moveRelative(0,-1,0);
        }
        break;
      case 'w':
        if (window.rotateMode) {
          window.activeTet = rotateCollection(window.activeTet, '-y');
        } else {
          window.activeTet.moveRelative(-1,0,0);
        }
        break;
      case 'e':
        if (window.rotateMode) {
          window.activeTet = rotateCollection(window.activeTet, '-x');
        } else {
          window.activeTet.moveRelative(0,0,1);
        }
        break;
      case 'd':
        if (window.rotateMode) {
          window.activeTet = rotateCollection(window.activeTet, 'z');
        } else {
          window.activeTet.moveRelative(0,1,0);
        }
        break;
      case 'z':
        if (window.rotateMode) {
          window.activeTet = rotateCollection(window.activeTet, 'x');
        } else {
          window.activeTet.moveRelative(0,0,-1);
        }
        break;
      case 'x':
        if (window.rotateMode) {
          window.activeTet = rotateCollection(window.activeTet, 'y');
        } else {
          window.activeTet.moveRelative(1,0,0);
        }
        break;
      case 'r':
        window.rotateMode = !window.rotateMode;
    }
    cubesToDraw.addCubes(window.activeTet);
    $('#drawing-area').html(drawCollection(cubesToDraw));
    $('#message-box').html(
      "Current Position (" +
      boundaries(window.activeTet).min.x + ", " +
      boundaries(window.activeTet).min.y + ", " +
      boundaries(window.activeTet).min.z + ")"
    )

  });
});
