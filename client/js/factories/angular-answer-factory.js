app.factory('answerFactory', ['$http', 'tokenService', function($http, tokenService) {
  // Setup Factory Object:
  var factory = {};

  // Get Post on Page Load:
  factory.getPost = function(id, showPostCallback) {
    $http.get('/post/' + id)
      .then(function(postAndUser) {
        showPostCallback(postAndUser.data);
      })
      .catch(function(err) {
        console.log("Error getting post!");
        // console.log(err.data);
      })
  };

  // Create New Answer:
  factory.newAnswer = function(answerData, answerCallback, errorCallback) {
    $http.post('/answer/', answerData)
      .then(function(newAnswer) {
        answerCallback(newAnswer.data);
      })
      .catch(function(newAnswer) {
        errorCallback(newAnswer.data);
      })
  };

  // Get All Answers:
  factory.getAnswers = function(postID, getAnswersCallback) {
    $http.post('/post/answer', postID)
      .then(function(answersCommentsAndUsers) {
        getAnswersCallback(answersCommentsAndUsers.data);
      })
      .catch(function(err) {
        console.log("Error getting all answers!")
        // console.log(err.data)
      })
  };

  // Up Vote:
  factory.upVote = function(id, upVoteCallback) {
    $http.post('/answer/vote/up/', id)
      .then(function(data) {
        upVoteCallback();
      })
      .catch(function(err) {
        console.log(err.data);
      })
  };

  // Down Vote:
  factory.downVote = function(id, downVoteCallback) {
    $http.post('/answer/vote/down/', id)
      .then(function(message) {
        downVoteCallback()
      })
      .catch(function(err) {
        console.log(err.data);
      })
  };

  // New Comment:
  factory.newComment = function(comment, commentCallback, commErrorCallback) {
    $http.post('/comment', comment)
      .then(function(newComment) {
        commentCallback(newComment.data);
      })
      .catch(function(err) {
        commErrorCallback(err.data);
      })
  };

  // Logs out User:
  factory.logout = function(logoutCallback) {
    $http.post('/user/logout')
      .then(function() {
        // Deletes token from local storage:
        tokenService.removeLocal();
        console.log('logged out!');
        logoutCallback();
      })
      .catch(function(err) {
        console.log(err);
      })
  };

  // Return Factory Object:
  return factory;
}]);
