window.allCubes = [];
window.cursorCube = newCube(0,0,0);

$(function() {
  window.allCubes.push(cursorCube);
  $('#drawing-area').html(drawCollection(window.allCubes));

  // $('#drawing-area').on('click', function(e) {
  //   e.stopPropagation();
  //   // When in select mode, remember point clicked and select that point
  //   var point = getXY(e.pageX, e.pageY, window.rootarea);
  //
  // });
  //
  // $('body').on('click', function(e) {
  //
  // });
  //
  // $('#drawing-area').on('mousemove', function(e) {
  //   // When in select mode, redraw the selection when the mouse moves
  //   // (only when left button is held down)
  //   if (e.buttons === 1) {
  //
  //   }
  // });
  //
  // $('#drawing-area').on('mouseup', function(e) {
  //
  // });

  $(window).on('keydown', function(e) {
    // Parsing the keyboard
    // window.allCubes.pop();
    console.log(e.key);
    // switch (e.key) {
    //   case 's':
    //     window.allCubes = addCubes(window.allCubes, [window.cursorCube]);
    //     window.cursorCube = newCube(0,0,0);
    //     break;
    //   case 'a':
    //     cursorCube.z--;
    //     break;
    //   case 'w':
    //     cursorCube.z++;
    //     break;
    //   case 'e':
    //     cursorCube.x--;
    //     break;
    //   case 'd':
    //     cursorCube.x++;
    //     break;
    //   case 'z':
    //     cursorCube.y--;
    //     break;
    //   case 'x':
    //     cursorCube.y++;
    //     break;
    // }
    // window.allCubes.push(cursorCube);
    // $('#drawing-area').html(drawCollection(window.allCubes));

  });
});
