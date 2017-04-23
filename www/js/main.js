$(document).ready(function() {
  var hash = window.location.hash;
  if (hash) {
    // let's check if the user is trying to load internal pages
    // if so, we check if it's already loggedIn or not
    // so we can send them to the login page it that's the case
    if(!checkUserStatus()) {
      $.mobile.pageContainer.pagecontainer('change', '#login');
    } else {
      loadUserInfo('facebook');
    }
  } else {
    if(checkUserStatus()) {
      $.mobile.pageContainer.pagecontainer('change', '#feed');
      loadUserInfo('facebook');
    }
  }

  $('body').on('tap', '#leftpanel #logout', function() {
    if (window.localStorage) {
      window.localStorage.clear();
      $.mobile.pageContainer.pagecontainer('change', '#login');
    } else {
      // trick to redirect and reload the user to home route
      // this way it'll reset the variables for the session
      window.location = '';
    }
  });
});

function checkUserStatus() {
  var loggedIn = false;
  if(window.localStorage) {
    var fb_status = window.localStorage.getItem('fb_userID');
    if (fb_status) {
      loggedIn = true;
    }
  }
  return loggedIn;
}
