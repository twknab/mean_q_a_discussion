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
                res.json(allCategories);
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).json(err);
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
                res.json(allPostsFull)
            })
            .catch(function(err) {
                res.status(500).json(err);
            })
    },
    // Find a User for Profile Page:
    getUser: function(req, res) {
        User.findOne({_id: req.params.id})
            .populate('posts')
            .exec()
            .then(function(foundUserFull) {
                res.json(foundUserFull);
            })
            .catch(function(err) {
                res.status(500).json(err);
            })
    },
    // Find a Post for Answer and Comments page:
    getPost: function(req, res) {
        Post.findOne({_id: req.params.id})
            .populate('user')
            .exec()
            .then(function(postAndUser) {
                res.json(postAndUser);
            })
            .catch(function(err) {
                res.status(500).json(err);
            })
    },
    // Make a new answer:
    newAnswer: function(req, res) {
        Answer.create(req.body)
            .then(function(newAnswer) {
                User.findOne({username: jwt.verify(myToken, 'mySecretPasscode123!').username})
                    .then(function(foundUser) {
                        newAnswer.updateUser(foundUser._id); // add user ID to post
                        newAnswer.initVote(); // initialize up and down votes at 0
                        foundUser.addAnswer(newAnswer._id);
                        return res.json(newAnswer);
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
            .exec()
            .then(function(allAnswersAndUsers) {
                res.json(allAnswersAndUsers);
            })
            .catch(function(err) {
                res.status(500).json(err);
            })
    },
    // Up Vote:
    upVote : function(req, res) {
        console.log(req.body);
        Answer.findOne({_id: req.body.id})
            .then(function(foundAnswer) {
                foundAnswer.upVote();
                res.json('Up Vote Successful...');
            })
            .catch(function(err) {
                res.status(500).json(err);
            })
    },
    // Down Vote:
    downVote : function(req, res) {
        console.log(req.body);
        Answer.findOne({_id: req.body.id})
            .then(function(foundAnswer) {
                foundAnswer.downVote();
                res.json('Down Vote Successful...');
            })
            .catch(function(err) {
                res.status(500).json(err);
            })
    },
};
