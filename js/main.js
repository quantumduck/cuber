window.cursorCube = newCube(0,0,0);
window.allCubes = newCollection([window.cursorCube]);

$(function() {
  $('#drawing-area').html(drawCollection(window.allCubes));




  $(window).on('keydown', function(e) {
    var cubesToDraw = newCollection(window.allCubes);
    var type = Math.random() * 3;
    if (type > 2) {
      type = 'type3';
    } else if (type > 1) {
      type = 'type2';
    } else {
      type = 'type1';
    }
    // Parsing the keyboard
    // window.allCubes.deleteCube(window.cursorCube);
    switch (e.key) {
      case 's':
        window.allCubes.addCube(newCube(window.cursorCube.x, window.cursorCube.y, window.cursorCube.z, type));
        console.log('(' + window.cursorCube.x + ', ' + window.cursorCube.y + ', ' + window.cursorCube.z + ')');
        console.log('(' + window.cursorCube.projection().col + ', ' +  window.cursorCube.projection().row + ')');
        cubesToDraw.addCube(window.cursorCube);
        window.cursorCube = newCube(0,0,0);
        break;
      case 'a':
        window.cursorCube.y--;
        break;
      case 'w':
        window.cursorCube.x--;
        break;
      case 'e':
        window.cursorCube.z++;
        break;
      case 'd':
        window.cursorCube.y++;
        break;
      case 'z':
        window.cursorCube.z--;
        break;
      case 'x':
        window.cursorCube.x++;
        break;
    }
    cubesToDraw.addCube(window.cursorCube);
    $('#drawing-area').html(drawCollection(cubesToDraw));
    $('#message-box').html(
      "Current Position (" +
      window.cursorCube.x + ", " +
      window.cursorCube.y + ", " +
      window.cursorCube.z + ")"
    )

  });
});
