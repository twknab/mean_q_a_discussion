// register the interceptor as a service
app.factory('authInterceptor', function($q, tokenService, $location) {
  return {
    // optional method
    request: function(config) {
      // do something on success
      console.log("REQUEST MADE")
      token = tokenService.getToken();
      if (token) {
        // If token, send authorization jwt header:
        console.log("Authorizing token...");
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    },

    // optional method
    responseError: function(rejection) {
      // do something on error
      console.log("THIS IS THE RESPONSE ERROR:");
      if (rejection.status == 401 || rejection.status == 500) {
        console.log("401 ERROR DUDE...REDIRECTION");
        $location.url('/');
      }
      return $q.reject(rejection);
    }
  };
})
