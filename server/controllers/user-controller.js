// Grab our Mongoose Model:
var User = require('mongoose').model('User');

module.exports = {
    // Create a user
    create: function(req, res) {
        console.log('Server-side user controller talking...', req.body);
        User.create(req.body)
            .then(function(newUser) {
                return res.json(newUser);
            })
            .catch(function(err) {
                console.log('Error trying to create user!', err);
                if (err.errors == null) {
                    console.log('Custom Validator Function Error detected...formatting now and sending to front end:');
                    return res.status(500).json(err.message);
                } else {
                    console.log('Built in Mongoose Validation detected....');
                    return res.status(500).json(err.errors.username.message)
                };
            })
    },
    findLoggedIn: function(req, res) {
        console.log('Server-side user controller talking...getting user...');
        User.find({_id: req.user._id})
        // note, you need to setup your tokens or passport
        // that is to say, req.user won't exist until you set it up
        // either via login, or so forth
            .then(function(foundUser) {
                console.log('All users found!');
                console.log('%%%%%%%%%%%%%%%%%');
                console.log(foundUser);
                console.log('%%%%%%%%%%%%%%%%%');
                return res.json(foundUser);
            })
            .catch(function(err) {
                console.log('Error finding all users', err);
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
