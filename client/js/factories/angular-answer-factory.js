app.factory('answerFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // Get Post on Page Load:
    factory.getPost = function(id, showPostCallback) {
        console.log('Factory');
        $http.get('/post/' + id)
            .then(function(foundPostAndUser) {
                console.log(foundPostAndUser.data);
                showPostCallback(foundPostAndUser.data);
            })
            .catch(function(err) {
                console.log(err.data);
            })
    };

    // Create New Answer:
    factory.newAnswer = function(answer, answerCallback, errorCallback) {
        $http.post('/answer/', answer)
            .then(function(newAnswer) {
                console.log(newAnswer);
                answerCallback(newAnswer.data);
            })
            .catch(function(newAnswer) {
                errorCallback(newAnswer.data);
            })
    };

    // Get All Answers:
    factory.getAnswers = function(getAnswersCallback) {
        $http.get('/answer/')
            .then(function(allAnswersAndUsers) {
                getAnswersCallback(allAnswersAndUsers.data);
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
                commentCallback(newComment.data);
            })
            .catch(function(err) {
                console.log(err.data);
                commErrorCallback(err.data);
            })
    };

    // Get Comments:
    factory.getComments = function(getCommmentsCallback) {
        $http.get('/comment')
            .then(function(allCommentsAndUsers) {
                getCommmentsCallback(allCommentsAndUsers.data);
            })
            .catch(function(err) {
                console.log(err);
            })
    };

    // Return Factory Object:
    return factory;
}]);
