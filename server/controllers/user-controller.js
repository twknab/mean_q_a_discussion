// Setup JSON Web Token:
var jwt = require('jsonwebtoken'), // JSON Web Tokens
    myToken;

// Grab our Mongoose Model:
var User = require('mongoose').model('User');

module.exports = {
    // Login a user
    login: function(req, res) {
        console.log('Server-side user controller talking...', req.body);

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
                    console.log('NOT FOUND!!!');
                    var err = "Username was not found."
                    return res.status(500).json({message: {message: err}});
                }
                // If User Found, Validate Username and Password:
                console.log('CHECKING PWD');
                foundUser.verifyPassword(req.body.password)
                    .then(function() {
                        myToken = jwt.sign({username: req.body.username}, 'mySecretPasscode123!');
                        console.log({user: foundUser, myToken: myToken});
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
                console.log('Error finding user!', err.message);
                return res.status(500).json(err);
            })
    },
    // Register a user
    register: function(req, res) {
        console.log('Server-side user controller talking...', req.body);

        // Check if Passwords Match:
        if (req.body.password != req.body.password_confirm) {
            return res.status(500).json({message: {message: 'Password and confirmation do not match.'}});
        }

        User.create(req.body)
            .then(function(newUser) {
                myToken = jwt.sign({username: req.body.username}, 'mySecretPasscode123!');
                console.log(jwt.verify(myToken, 'mySecretPasscode123!'));
                console.log({user: newUser, myToken: myToken});
                return res.json({user: newUser, myToken: myToken});
            })
            .catch(function(err) {
                console.log('Error trying to create user!', err.message);
                if (err.errors == null) {
                    console.log('Custom Validator Function Error detected...formatting now and sending to front end:');
                    return res.status(500).json({message: {message: err.message}});
                } else {
                    console.log('Built in Mongoose Validation detected....');
                    return res.status(500).json(err.errors)
                };
            })
    },
    getUser: function(req, res) {
        console.log('Server-side user controller talking...getting user...');
        console.log(jwt.verify(myToken, 'mySecretPasscode123!'));
        User.findOne({username: jwt.verify(myToken, 'mySecretPasscode123!').username})
            .then(function(foundUser) {
                console.log(foundUser);
                return res.json(foundUser);
            })
            .catch(function(err) {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    findOne: function(req, res) {
        User.findOne({_id: req.params.id})
            .then(function(userToEdit) {
                console.log('Found user...', userToEdit);
                req.user = userToEdit; // attaches user to req for easy access later
                return res.json(userToEdit);
            })
            .catch(function(err) {
                console.log('Error finding user to edit...', err);
                return res.status(500).json(err);
            })
    },
    update: function(req, res) {
        User.findOne({_id: req.params.id})
            .then(function(foundUser) {
                foundUser.username = req.body.username;
                foundUser.save()
                    .then(function(savedUser) {
                        console.log('User successfully saved and updated!', savedUser);
                        return res.json(savedUser);
                    })
                    .catch(function(err) {
                        console.log('Error updating and saving user!', err);
                        if (err.errors == null) {
                            console.log('Custom Validator Function Error detected...formatting now and sending to front end:');
                            return res.status(500).json(err.message);
                        } else {
                            console.log('Built in Mongoose Validation detected....');
                            return res.status(500).json(err.errors.username.message)
                        };
                    });
            })
            .catch(function(err) {
                console.log('There has been an error!');
                return res.status(500).json(err);
            })

        /* NOTE: You can do it this way, but your PRE/POST and BUILT-IN VALIDATIONS won't run! The above way ensures any updates validate!
            User.findOneAndUpdate({_id: req.params.id}, req.body) // note: pre and post hooks do not run here
                .then(function(updatedUser) {
                    console.log(updatedUser);
                    return res.json(updatedUser);
                })
                .catch(function(err) {
                    console.log(err);
                })
        */
    },
    delete: function(req, res) {
        User.remove({_id: req.params.id})
            .then(function() {
                return res.json('Delete Success!');
            })
            .catch(function(err) {
                console.log(err);
                return res.status(500).json(err);
            })
    },
};
