// Setup dependencies:
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-as-promised'),
    Schema = mongoose.Schema;

// Setup a schema:
var UserSchema = new Schema (
    {
        username: {
            type: String,
            minlength: [2, 'Username must be at least 2 characters.'],
            maxlength: [20, 'Username must be less than 20 characters.'],
            required: [true, 'Username is required.'],
            trim: true,
            unique: true, // username must be unique
            dropDups: true,
        }, // end username field
        email: {
            type: String,
            required: [true, 'Email is required and must be in a valid email format.'],
            trim: true,
            unique: true, // email must be unique
            dropDups: true,
        }, // end email field
        password: {
            type: String,
            required: [true, 'Password is required.'],
            trim: true,
        }, // end password field
    },
    {
        timestamps: true,
    }
);

/**********************/
/*  INSTANCE METHODS  */
/**********************/

// RegEx Validation (Alphanumerical and Underscores Only):
UserSchema.methods.alphaumerUsernameCheck = function(username) {
    var regex = /^[a-z0-9_]+$/i;
    return regex.test(username);
};

// Checks for duplicate usernames or emails in database prior to user creation:
UserSchema.methods.checkDuplicates = function(user, next) {
    User.findOne({username: { $regex : new RegExp("^" + user.username + "$", "i")}})
        .then(function(foundUser) {
            if(foundUser) { // if user is found, send error:
                var err = new Error('Username is already taken.');
                next(err);
            }
            if(!foundUser) { // if user is not found, check for email duplicates:
                User.findOne({email: { $regex : new RegExp("^" + user.email + "$", "i")} })
                    .then(function(foundEmail) {
                        if(foundEmail) { // if email found, send error:
                            err = new Error('Email already is associated with a user account.');
                            next(err);
                        }
                        if(!foundEmail) { // if no errors, continue:
                            next();
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
            }
        })
        .catch(function(err) { // if our regex query goes awry this will catch any errors:
            next(err);
        })
};

// Verify User Entered Password to Hash:
UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compare(password, this.password);
};


/*************************/
/*  PRE SAVE MIDDLEWARE  */
/*************************/

// Pre Save Hook:
UserSchema.pre('save', function(next) {
    var self = this;

    bcrypt.hash(self.password, 10) // returns encrpyted hash as promise:
        .then(function(hash) {
            self.password = hash; // set password to returned hash
            if (self.alphaumerUsernameCheck(self.username)) { // if alphanumer validation passes:
                self.checkDuplicates(self, next); // check for username or email duplicates
            } else {
                var err = new Error('Username may contain only letters, numbers or underscores.'); // if username fails validation
                console.log(err);
                next(err);
            };
        })
        .catch(next);


});

/***************************/
/*  CREATE MODEL & EXPORT  */
/***************************/

// Instantiate Mongoose Model:
var User = mongoose.model('User', UserSchema);

// Export Model:
module.exports = User;
