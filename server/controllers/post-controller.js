// Setup JSON Web Token:
var jwt = require('jsonwebtoken'), // JSON Web Tokens
    myToken;

// Grab our Mongoose Model:
var Category = require('mongoose').model('Category');
var Post = require('mongoose').model('Post');

module.exports = {

    // Get Categories:
    getCategories: function(req, res) {
        Category.find()
            .then(function(allCategories) {
                res.json(allCategories)
            })
            .catch(function(err) {
                res.status(500).json(err);
            })
    },
    // Create New Post:
    newPost: function(req, res) {
        console.log('**3');
        console.log(req.body);
        Post.create(req.body)
            .then(function(newPost) {
                // how can you get the currently logged in user and push their ID?
                // possible solution:
                //      merge your controllers for this project
                //      then your token will be avail to the whole scope
                //      this won't be as modularized but then you're still not using session
                return res.json(newPost);
            })
            .catch(function(err) {
                if (err.errors == null) {
                    return res.status(500).json({message: {message: err.message}});
                } else {
                    return res.status(500).json(err.errors)
                };
            })
    },
};
