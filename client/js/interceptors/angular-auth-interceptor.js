app.factory('authInterceptor', function($q, tokenService, $location) {
  return {
    request: function(config) {
      token = tokenService.getToken();
      if (token) {
        // If token, send authorization jwt header:
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    },

    requestError: function(rejection) {
      // Do stuff here with the request error:
      return $q.reject(rejection);
    },

    response: function(response) {
      // Do stuff here if you want to intercept the response:
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
