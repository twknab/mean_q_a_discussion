app.factory('answerFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // Get Post on Page Load:
    factory.getPost = function(id, showPostCallback) {
        console.log('Factory');
        $http.get('/post/' + id)
            .then(function(postAndUser) {
                console.log(postAndUser.data);
                showPostCallback(postAndUser.data);
            })
            .catch(function(err) {
                console.log(err.data);
            })
    };

    // Create New Answer:
    factory.newAnswer = function(answerData, answerCallback, errorCallback) {
        $http.post('/answer/', answerData)
            .then(function(newAnswer) {
                console.log('$$$$$$ NEW ANSWER $$$$$$$');
                console.log(newAnswer);
                answerCallback(newAnswer.data);
            })
            .catch(function(newAnswer) {
                errorCallback(newAnswer.data);
            })
    };

    // Get All Answers:
    factory.getAnswers = function(postID, getAnswersCallback) {
        console.log('getting answers for this post...', postID);
        $http.post('/post/answer', postID)
            .then(function(answersCommentsAndUsers) {
                console.log(answersCommentsAndUsers.data);
                getAnswersCallback(answersCommentsAndUsers.data);
            })
            .catch(function(err) {
                console.log(err.data)
            })
    };

    // Up Vote:
    factory.upVote = function(id, upVoteCallback) {
        console.log('factory');
        console.log(id);
        $http.post('/answer/vote/up/', id)
            .then(function(data) {
                console.log(data.data);
                upVoteCallback();
            })
            .catch(function(err) {
                console.log(err.data);
            })
    };

    // Down Vote:
    factory.downVote = function(id, downVoteCallback) {
        console.log('factory');
        console.log(id);
        $http.post('/answer/vote/down/', id)
            .then(function(message) {
                console.log(message.data);
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
                console.log('$$$ New Comment Returned:', newComment);
                commentCallback(newComment.data);
            })
            .catch(function(err) {
                console.log(err);
                commErrorCallback(err.data);
            })
    };

    // Logout:
    factory.logout = function(logoutCallback) {
        console.log('about to send api request for logout');
        $http.post('/user/logout')
            .then(function() {
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
