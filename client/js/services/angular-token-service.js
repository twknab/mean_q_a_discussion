app.service('tokenService', function($window) {

  return {
    saveToken: function(token) {
      /*
      Saves token to local storage.
      */

      $window.localStorage.jwtToken = token;
      return $window.localStorage.jwtToken;
    },
    getToken: function() {
      /*
      Returns token from local storage.
      */

      return $window.localStorage.jwtToken;
    },
    isAuthed: function() {
      /*
      Checks if local token exists.
      */

      const token = self.getToken();
      if (token) {
        return token;
      } else {
        return false;
      }
    },
    removeLocal: function() {
      /*
      Removes token from local storage.
      */

      delete $window.localStorage['jwtToken'];
      return undefined;
    },
  };

});
