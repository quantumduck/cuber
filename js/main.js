$(function() {

  $('#drawing-area').on('click', function(e) {
    e.stopPropagation();
    // When in select mode, remember point clicked and select that point
    var point = getXY(e.pageX, e.pageY, window.rootarea);
    
  });

  $('body').on('click', function(e) {

  });

  $('#drawing-area').on('mousemove', function(e) {
    // When in select mode, redraw the selection when the mouse moves
    // (only when left button is held down)
    if (e.buttons === 1) {

    }
  });

  $('#drawing-area').on('mouseup', function(e) {

  });

  $(window).on('keydown', function(e) {
    // Parsing the keyboard
    console.log(e.key);

  });
});
