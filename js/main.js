$(function() {

  $('#drawing-area').on('click', function(e) {
    e.stopPropagation();
    // When in select mode, remember point clicked and select that point
    var point = getXY(e.pageX, e.pageY, window.rootarea);
    if(window.rootarea.hasPoint(point.x, point.y)) {
      if (window.options.free.enabled) {
        var newArea = areaInit({
          xmin: point.x,
          ymin: point.y,
          xmax: point.x,
          ymax: point.y
        });
        newArea = writeChar(newArea, window.options.free.char, point.x, point.y);
        window.rootarea = addSubArea(window.rootarea, newArea);
      }
      console.log(point);
      window.state.action = "none";
      window.selection = newAreaSelection(window.rootarea, point, point);
      redraw(window.rootarea, window.selection);
    } else {
      // Keep track of bad click events...
      console.log(point);
      console.log([e.pageX, e.pageY])
    }

  });

  $('body').on('click', function(e) {
    window.selection = false;
    window.state.action = "none";
    redraw(window.rootarea, window.selection);
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
