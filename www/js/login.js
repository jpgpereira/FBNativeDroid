var fb_permissions = ['public_profile'],
    fb_accessToken,
    fb_expiration,
    fb_userID;

$(document).on('pageinit', '#login', function() {
  $('#login_fb').on('tap', function() {
    facebookConnectPlugin.login(fb_permissions, fbLoginSuccess, fbLoginFailure);
  });
});

$(document).on('pageload', '#login', function() {
  console.log('Login Page Loaded');
});

function fbLoginSuccess(obj) {
  if (obj.status == 'connected') {
    if (window.localStorage) {
      window.localStorage.setItem("fb_accessToken", obj.authResponse.accessToken);
      window.localStorage.setItem("fb_expiration", obj.authResponse.expiresIn);
      window.localStorage.setItem("fb_userID", obj.authResponse.userID);
      $.mobile.pageContainer.pagecontainer('change', '#feed');
      fetchUserData('facebook');
    } else {
      console.log('Local Storage not available');
      // localStorage is not available, so we might want to save the user data to some variables
      // this will not be saved on the next session, like localStorage
      fb_accessToken = obj.authResponse.accessToken;
      fb_expiration = obj.authResponse.expiresIn;
      fb_userID = obj.authResponse.userID;
    }
  } else {
    alert('Facebook status was not connected, check the console');
    console.log(obj);
  }
}

function fbLoginFailure(obj) {
  alert('Some error logging in with Facebook, check the console');
  console.log(obj);
}
