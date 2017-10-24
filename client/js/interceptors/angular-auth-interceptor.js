// register the interceptor as a service
app.factory('authInterceptor', function($q, tokenService, $location) {
  return {
    request: function(config) {
      token = tokenService.getToken();
      if (token) {
        // If token, send authorization jwt header:
        console.log("Authorizing token...");
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    },

    requestError: function(rejection) {
      return $q.reject(rejection);
    },

    response: function(response) {
      // do something on success
      return response;
    },

    responseError: function(rejection) {
      if (rejection.status == 401 || rejection.status == 500 || rejection.status == 404) {
        $location.url('/');
      }
      return $q.reject(rejection);
    },
  };
})
