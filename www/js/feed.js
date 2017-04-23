$(document).on('pageinit', '#main', function() {
  loadUserInfo('facebook');
});

$(document).on('pageload', '#main', function() {
  loadUserInfo('facebook');
});

function loadUserInfo(source) {
  if ($('#userPhoto').length > 0 && $('#userName').length > 0) {
    console.log('Load user info');
    console.log(source);
    switch (source) {
      case 'facebook':
      if(window.localStorage) {
        $('#userPhoto').attr('src', window.localStorage.getItem('fb_userPhoto'))
        $('#userName').html(window.localStorage.getItem('fb_userName'))
      } else {
        $('#userPhoto').attr('src', fb_photo);
        $('#userName').html(fb_name);
      }
      break;
      default:
      console.log('Unknow source to load user info');
      console.log(source);
    }
  } else {
    setTimeout(function() {
      loadUserInfo(source)
    }, 1000);
  }
}

function fetchUserData(source) {
  console.log('Fetch user data');
  console.log(source);
  switch (source) {
    case 'facebook':
      facebookConnectPlugin.api(
        '/v2.5/me?fields=id,name,picture.height(480)',
        fb_permissions,
        function success(obj) {
          if (obj) {
            if (window.localStorage) {
              window.localStorage.setItem("fb_userName", obj.name);
              window.localStorage.setItem("fb_userPhoto", obj.picture.data.url);
              loadUserInfo('facebook');
            } else {
              alert('Local Storage not available');
            }
          } else {
            alert('Some error, check the console');
            console.log(obj);
          }
        },
        function error(error) {
          alert('Some error fetching data from Facebook, check the console');
          console.log(obj);
        }
      );
      break;
    default:
      console.log('Unknow source to fetch user info');
      console.log(source);
  }
}
