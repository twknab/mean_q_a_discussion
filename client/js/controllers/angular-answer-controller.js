app.controller('answerController', ['$scope', 'answerFactory', '$location', '$routeParams', function($scope, answerFactory, $location, $routeParams) {

    // Callbacks:
    var cb = {
        getPost: function(postAndUser) {
            $scope.post = postAndUser;
        },
        answer: function(newAnswer) {
            console.log(newAnswer);
            $scope.answer = {};
            $scope.getAnswers();
        },
        newAnswerError: function(err) {
            console.log(err);
            $scope.newAnswerErrors = '';
            $scope.newAnswerErrors = err;
        },
        getAnswers: function(allAnswersAndUsers) {
            console.log(allAnswersAndUsers);
            $scope.allAnswers = allAnswersAndUsers;
        },
        upVote: function() {
            $scope.getAnswers();
        },
        downVote: function() {
            $scope.getAnswers();
        },
        comment: function() {
            // $scope.answer.newUserComment = {};
            console.log($scope.allAnswers);
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
    };

    // Get Post/Topic:
    $scope.getPost = function() {
        console.log($routeParams.id);
        answerFactory.getPost($routeParams.id, cb.getPost);
    };

    // Get Post/Topic on partial load:
    $scope.getPost();

    // Create a new Answer:
    $scope.newAnswer = function() {
        answerFactory.newAnswer($scope.answer, cb.answer, cb.newAnswerError);
    };

    // Get All Answers:
    $scope.getAnswers = function() {
        answerFactory.getAnswers(cb.getAnswers);
    };

    // Get All Answers on page load:
    $scope.getAnswers();

    // Up Vote:
    $scope.upVote = function(answer) {
        console.log('controller');
        console.log(answer._id);
        answerFactory.upVote({id: answer._id}, cb.upVote)
    };

    // Down Vote:
    $scope.downVote = function(answer) {
        console.log('down voting...');
        console.log(answer._id);
        answerFactory.downVote({id: answer._id}, cb.downVote)
    };

    $scope.newUserComment = {
        "description" : {},
    };

    // Create a Comment:
    $scope.newComment = function(answer) {
        console.log(answer.newUserComment);
        answer.newUserComment.answerID = answer._id;
        console.log(answer.newUserComment.answerID);
        answerFactory.newComment(answer.newUserComment, cb.comment, cb.commentError);
    };

}]);
