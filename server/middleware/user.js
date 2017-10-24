module.exports = function(app){


  // Sets up middlware using User and looks up based on session ID.
  app.use(function(req, res, next) {
      var User = require('mongoose').model('User')

      // How to Improve JWTs:
      // Change the below Session information in your Middlware to utilize
      // your JWT's instead.. =)

      // if (req.session.userID) {
      //     User.findById(req.session.userID)
      //         .then(function(user) {
      //             req.user = user;
      //             next();
      //         })
      //         .catch(next);
      // }

      next();
  });

};
