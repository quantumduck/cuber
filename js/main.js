window.cursorCube = newRandomTet();
window.allCubes = newCollection([]);
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
window.rotateMode = false;

$(function() {
  $('#drawing-area').html(drawCollection(window.allCubes));

  $(window).on('keydown', function(e) {
    var cubesToDraw = newCollection(window.allCubes);
    // Parsing the keyboard
    // window.allCubes.deleteCube(window.cursorCube);
    switch (e.key) {
      case 's':
        window.allCubes.addCubes(window.cursorCube);
        window.cursorCube = newRandomTet();
        cubesToDraw.addCube(window.cursorCube);
        break;
      case 'a':
        if (window.rotateMode) {
          window.cursorCube = rotateCollection(window.cursorCube, '-z');
        } else {
          window.cursorCube.moveRelative(0,-1,0);
        }
        break;
      case 'w':
        if (window.rotateMode) {
          window.cursorCube = rotateCollection(window.cursorCube, '-y');
        } else {
          window.cursorCube.moveRelative(-1,0,0);
        }
        break;
      case 'e':
        if (window.rotateMode) {
          window.cursorCube = rotateCollection(window.cursorCube, '-x');
        } else {
          window.cursorCube.moveRelative(0,0,1);
        }
        break;
      case 'd':
        if (window.rotateMode) {
          window.cursorCube = rotateCollection(window.cursorCube, 'z');
        } else {
          window.cursorCube.moveRelative(0,1,0);
        }
        break;
      case 'z':
        if (window.rotateMode) {
          window.cursorCube = rotateCollection(window.cursorCube, 'x');
        } else {
          window.cursorCube.moveRelative(0,0,-1);
        }
        break;
      case 'x':
        if (window.rotateMode) {
          window.cursorCube = rotateCollection(window.cursorCube, 'y');
        } else {
          window.cursorCube.moveRelative(1,0,0);
        }
        break;
      case 'r':
        window.rotateMode = !window.rotateMode;
    }
    cubesToDraw.addCubes(window.cursorCube);
    $('#drawing-area').html(drawCollection(cubesToDraw));
    $('#message-box').html(
      "Current Position (" +
      window.cursorCube[0].x + ", " +
      window.cursorCube[0].y + ", " +
      window.cursorCube[0].z + ")"
    )

  });
});
