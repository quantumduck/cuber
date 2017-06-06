// window.allCubes = [];
// window.cursorCube = newCube(0,0,0);

$(function() {
  // window.allCubes.push(cursorCube);
  // $('#drawing-area').html(drawCollection(window.allCubes));


  // var drawing = [[]];
  // for (var j = 0; j < drawing.length; j++) {
  //   for (var i = 0; i < 4; i++) {
  //     drawing[j].push('&nbsp;');
  //     // console.log(i);
  //   }
  // }

  var drawing = [['&nbsp','&nbsp','&nbsp','&nbsp']];

  // var blankRow = ['&nbsp','&nbsp','&nbsp','&nbsp'];
  // for (var i = 0; i < drawing[0].length; i++) {
  //   blankRow.push('&nbsp;');
  // }
  for (var j = 0; j < 4; j++) {
    var newRow = [];
    for (var i = 0; i < 4; i++) {
      newRow.push('&nbsp;');
    }
    drawing.push(newRow);
  }

  // drawing = [['&nbsp','&nbsp','&nbsp','&nbsp'],['&nbsp','&nbsp','&nbsp','&nbsp'],['&nbsp','&nbsp','&nbsp','&nbsp']];

  drawing[2][2] = 'a';
  // console.log(blankRow);

  $('#drawing-area').html(drawing.join('<br>').split(',').join(''));
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
    switch (e.key) {
      case 's':
        window.allCubes = addCubes(window.allCubes, [window.cursorCube]);
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
    // window.allCubes.push(cursorCube);
    // $('#drawing-area').html(drawCollection(window.allCubes));

  });
});
