window.type = Math.random() * 3;
if (window.type > 2) {
  window.type = 'type3';
} else if (window.type > 1) {
  window.type = 'type2';
} else {
  window.type = 'type1';
}
window.cursorCube = newCube(0,0,0, window.type);
window.allCubes = newRandomTet();
for (var i = 0; i < 10; i++) {
  window.allCubes.addCube(newCube(-1,i,-1,''));
  window.allCubes.addCube(newCube(i,10,-1,''));
  window.allCubes.addCube(newCube(-1,10,i,''));
  for (var j = 0; j < 10; j++) {
    window.allCubes.addCube(newCube(i,j,-1,''));
    window.allCubes.addCube(newCube(-1,i,j,''));
    window.allCubes.addCube(newCube(i,10,j,''));
  }
}

$(function() {
  $('#drawing-area').html(drawCollection(window.allCubes));




  $(window).on('keydown', function(e) {
    var cubesToDraw = newCollection(window.allCubes);
    var type = Math.random() * 3;

    // Parsing the keyboard
    // window.allCubes.deleteCube(window.cursorCube);
    switch (e.key) {
      case 's':
        window.allCubes.addCube(newCube(window.cursorCube.x, window.cursorCube.y, window.cursorCube.z, window.type));
        console.log('(' + window.cursorCube.x + ', ' + window.cursorCube.y + ', ' + window.cursorCube.z + ')');
        console.log('(' + window.cursorCube.projection().col + ', ' +  window.cursorCube.projection().row + ')');
        cubesToDraw.addCube(window.cursorCube);
        window.type = Math.random() * 3;
        if (window.type > 2) {
          window.type = 'type3';
        } else if (window.type > 1) {
          window.type = 'type2';
        } else {
          window.type = 'type1';
        }
        window.cursorCube = newCube(0,0,0, window.type);
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
