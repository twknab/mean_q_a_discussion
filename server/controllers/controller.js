// Setup JSON Web Token:
var jwt = require('jsonwebtoken'), // JSON Web Tokens
    myToken;

// Grab our Mongoose Models:
var User = require('mongoose').model('User');
var Category = require('mongoose').model('Category');
var Post = require('mongoose').model('Post');
var Answer = require('mongoose').model('Answer');
var Comment = require('mongoose').model('Comment');

module.exports = {

    // Login a User:
    login: function(req, res) {
        // Validation: Username and Password Empty Check:
        if (!req.body.username || !req.body.password) {
            var err = "Username and Password are required fields.";
            return res.status(500).json({message: {message: err}});
        };

        // Look Up User based on Username:
        User.findOne({username: req.body.username})
            .then(function(foundUser) {
                // If User Not Found, Error:
                if (!foundUser) {
                    var err = "Username was not found."
                    return res.status(500).json({message: {message: err}});
                }
                // If User Found, Validate Username and Password:
                foundUser.verifyPassword(req.body.password)
                    .then(function() {
                        myToken = jwt.sign({username: req.body.username}, 'mySecretPasscode123!');
                        return res.json({user: foundUser, myToken: myToken});

                    })
                    .catch(function(err) {
                        // If Validation Fails:
                        console.log(err);
                        return res.status(500).json({message: {message: 'Password is not correct.'}})
                    })
            })
            // If Lookup Fails:
            .catch(function(err) {
                return res.status(500).json(err);
            })
    },

    // Register a User:
    register: function(req, res) {
        // Check if Passwords Match:
        if (req.body.password != req.body.password_confirm) {
            return res.status(500).json({message: {message: 'Password and confirmation do not match.'}});
        }
        // Create User:
        User.create(req.body)
            .then(function(newUser) {
                myToken = jwt.sign({username: req.body.username}, 'mySecretPasscode123!', {expiresIn: '6h'});
                return res.json({user: newUser, myToken: myToken});
            })
            .catch(function(err) {
                if (err.errors == null) {
                    return res.status(500).json({message: {message: err.message}});
                } else {
                    return res.status(500).json(err.errors)
                };
            })
    },

    // Load logged in User from web token:
    getLoggedIn: function(req, res) {
        User.findOne({username: jwt.verify(myToken, 'mySecretPasscode123!').username})
            .then(function(foundUser) {
                req.user = foundUser;
                return res.json(foundUser);
            })
            .catch(function(err) {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    // Get Categories:
    getCategories: function(req, res) {
        Category.find({})
            .then(function(allCategories) {
                console.log(allCategories);
                return res.json(allCategories);
            })
            .catch(function(err) {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    // Create New Post:
    newPost: function(req, res) {
        Post.create(req.body)
            .then(function(newPost) {
                User.findOne({username: jwt.verify(myToken, 'mySecretPasscode123!').username})
                    .then(function(foundUser) {
                        newPost.updateUser(foundUser._id); // add user ID to post
                        newPost.initAnswerCount(); // initialize # of answers at 0
                        foundUser.addPost(newPost._id);
                        console.log(foundUser, '%%%%%%%%%');
                        return res.json(newPost);
                    })
            })
            .catch(function(err) {
                if (err.errors == null) {
                    return res.status(500).json({message: {message: err.message}});
                } else {
                    return res.status(500).json(err.errors)
                };
            })
    },
    // Get All Posts:
    getAllPosts: function(req, res) {
        Post.find({})
            .populate('user')
            .populate('category')
            .exec()
            .then(function(allPostsFull) {
                return res.json(allPostsFull)
            })
            .catch(function(err) {
                return res.status(500).json(err);
            })
    },
    // Find a User for Profile Page:
    getUser: function(req, res) {
        User.findOne({_id: req.params.id})
            .populate('posts')
            .populate('answers')
            .populate('comments')
            .exec()
            .then(function(foundUserFull) {
                return res.json(foundUserFull);
            })
            .catch(function(err) {
                return res.status(500).json(err);
            })
    },
    // Find a Post for Answer and Comments page:
    getPost: function(req, res) {
        Post.findOne({_id: req.params.id})
            .populate('user')
            .exec()
            .then(function(postAndUser) {
                return res.json(postAndUser);
            })
            .catch(function(err) {
                return res.status(500).json(err);
            })
    },
    // Make a new answer:
    newAnswer: function(req, res) {
        console.log(req.body);
        Answer.create(req.body)
            .then(function(newAnswer) {
                User.findOne({username: jwt.verify(myToken, 'mySecretPasscode123!').username})
                    .then(function(foundUser) {
                        newAnswer.updateUser(foundUser._id); // add user ID to answer
                        newAnswer.initVote(); // initialize up and down votes at 0
                        newAnswer.updatePostID(req.body.postID); // adds postID to answer
                        foundUser.addAnswer(newAnswer._id); // add answer ID to user array
                        Post.findOne({_id: req.body.postID})
                            .then(function(foundPost) {
                                foundPost.increaseAnswerCount();
                                return res.json(newAnswer);
                            })
                    })
            })
            .catch(function(err) {
                if (err.errors == null) {
                    return res.status(500).json({message: {message: err.message}});
                } else {
                    return res.status(500).json(err.errors)
                };
            })
    },
    // Get all Answers:
    getAllAnswers: function(req, res) {
        Answer.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .exec()
            .then(function(allAnswersAndUsers) {
                return res.json(allAnswersAndUsers);
            })
            .catch(function(err) {
                return res.status(500).json(err);
            })
    },
    // Up Vote:
    upVote : function(req, res) {
        console.log(req.body);
        Answer.findOne({_id: req.body.id})
            .then(function(foundAnswer) {
                foundAnswer.upVote();
                return res.json('Up Vote Successful...');
            })
            .catch(function(err) {
                return res.status(500).json(err);
            })
    },
    // Down Vote:
    downVote : function(req, res) {
        console.log(req.body);
        Answer.findOne({_id: req.body.id})
            .then(function(foundAnswer) {
                foundAnswer.downVote();
                return res.json('Down Vote Successful...');
            })
            .catch(function(err) {
                return res.status(500).json(err);
            })
    },
    // New Comment:
    newComment : function(req, res) {
        Comment.create(req.body) // creatse comment
            .then(function(newComment) {
                User.findOne({username: jwt.verify(myToken, 'mySecretPasscode123!').username})
                    .then(function(foundUser) {
                        console.log(foundUser._id);
                        newComment.updateUser(foundUser._id); // adds user ID to comment
                        newComment.addAnswer(req.body.answerID); // adds answer ID to Comment.answers array
                        foundUser.addComments(newComment._id);
                        Answer.findOne({_id: req.body.answerID})
                            .then(function(foundAnswer) {
                                foundAnswer.addComment(newComment._id); // adds comment into Answer.comments array
                                return res.json(newComment);
                            })
                    })
            })
            .catch(function(err) {
                return res.status(500).json(err);
            })
    },
    // Logout:
    logout : function(req, res) {
        console.log('logging out now..');
        myToken = {};
        res.json('now logged out token destroyed.');
    },
};
