app.controller('answerController', ['$scope', 'answerFactory', '$location', '$routeParams', function($scope, answerFactory, $location, $routeParams) {

    // Callbacks:
    var cb = {
        getPost: function(postAndUser) {
            $scope.post = postAndUser;
        },
        answer: function(newAnswer) {
            $scope.answer = {};
            $scope.getAnswers();
        },
        newAnswerError: function(err) {
            $scope.newAnswerErrors = '';
            $scope.newAnswerErrors = err;
        },
        getAnswers: function(answersCommentsAndUsers) {
            $scope.allAnswers = answersCommentsAndUsers;
        },
        upVote: function() {
            $scope.getAnswers();
        },
        downVote: function() {
            $scope.getAnswers();
        },
        comment: function(newComment) {
            // console.log($scope.allAnswers);
            for (var i = 0; i < $scope.allAnswers.length; i++) {
                $scope.allAnswers[i].newUserComment = {};
                if (i == $scope.allAnswers.length - 1) {
                    $scope.getAnswers();
                }
            };
        },
        commentError: function(err) {
            $scope.newCommentErrors = '';
            $scope.newCommentErrors = err;
        },
        logout: function() {
            $location.url('/');
        },
    };

    // Get Post/Topic:
    $scope.getPost = function() {
        answerFactory.getPost($routeParams.id, cb.getPost);
    };

    // Get Post/Topic on partial load:
    $scope.getPost();

    // Create New Answer:
    $scope.newAnswer = function(post) {
        $scope.answerData = {
            description: $scope.answer.description,
            postID: post._id,
        };
        answerFactory.newAnswer($scope.answerData, cb.answer, cb.newAnswerError);
    };

    // Get All Answers:
    $scope.getAnswers = function() {
        answerFactory.getAnswers({postID: $routeParams.id}, cb.getAnswers);
    };

    // Get All Answers on page load:
    $scope.getAnswers();

    // Up Vote:
    $scope.upVote = function(answer) {
        answerFactory.upVote({id: answer._id}, cb.upVote)
    };

    // Down Vote:
    $scope.downVote = function(answer) {
        answerFactory.downVote({id: answer._id}, cb.downVote)
    };

    // Create a Comment:
    $scope.newComment = function(answer) {
        answer.newUserComment.answerID = answer._id;
        answerFactory.newComment(answer.newUserComment, cb.comment, cb.commentError);
    };

    // Dashboard Home Button:
    $scope.dashboard = function() {
        $location.url('/dashboard');
    };

    // Logout:
    $scope.logout = function() {
        answerFactory.logout(cb.logout);
    };

}]);
