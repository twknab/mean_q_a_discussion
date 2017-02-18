// Setup JSON Web Token:
var jwt = require('jsonwebtoken'), // JSON Web Tokens
    myToken;

// Grab our Mongoose Models:
var User = require('mongoose').model('User');
var Category = require('mongoose').model('Category');
var Post = require('mongoose').model('Post');

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
                myToken = jwt.sign({username: req.body.username}, 'mySecretPasscode123!');
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
                        newPost.updateUser(foundUser._id);
                        newPost.initCommentCount();
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
};
