$(document).ready(function() {
  setUpRouter();
});

function setUpRouter() {
  if($('#leftpanel').length > 0) {
    $('#leftpanel li a').on('tap', function() {
      var route = $(this).data('url');
      $.get(route, function(content) {
        $('#container .ui-content').html(content);
      });
    });
  } else {
    setTimeout(setUpRouter, 250);
  }
}
