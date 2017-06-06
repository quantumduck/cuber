window.allCubes = [];
window.cursorCube = newCube(0,0,0);

$(function() {
  window.allCubes.push(cursorCube);
  $('#drawing-area').html(drawCollection(window.allCubes));




  $(window).on('keydown', function(e) {
    // Parsing the keyboard
    window.allCubes.pop();
    console.log('(' + window.cursorCube.x + ', ' + window.cursorCube.y + ', ' + window.cursorCube.z + ')');
    switch (e.key) {
      case 's':
        addCubes(window.allCubes, [cursorCube]);
        console.log('(' + window.cursorCube.x + ', ' + window.cursorCube.y + ', ' + window.cursorCube.z + ')');
        console.log('(' + window.cursorCube.projection().col + ', ' +  window.cursorCube.projection().row + ')');
        window.cursorCube = newCube(0,0,0);
        break;
      case 'a':
        cursorCube.z--;
        break;
      case 'w':
        cursorCube.z++;
        break;
      case 'e':
        cursorCube.x--;
        break;
      case 'd':
        cursorCube.x++;
        break;
      case 'z':
        cursorCube.y--;
        break;
      case 'x':
        cursorCube.y++;
        break;
    }
    window.allCubes.push(cursorCube);
    $('#drawing-area').html(drawCollection(window.allCubes));

  });
});
