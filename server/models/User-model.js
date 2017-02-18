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
            required: [true, 'Your username cannot be blank.'],
            trim: true,
            unique: true, // username must be unique
            dropDups: true,
        }, // end username field
        email: {
            type: String,
            required: [true, 'Email is required and may contain only letters, numbers, and the following characters: ".", "+", "_", "-"'],
            trim: true,
            unique: true, // email must be unique
            dropDups: true,
        }, // end email field
        password: {
            type: String,
            required: [true, 'Your password cannot be blank.'],
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
    console.log('Username Creation Validation...Assessing for alphanumer characters and underscores...');
    var regex = /^[a-z0-9_]+$/i;
    return regex.test(username);
};

// Case insensitive query validation instance method:
UserSchema.methods.checkDuplicates = function(user, next) {
    console.log('Checking for duplicates...');
    User.findOne({username: { $regex : new RegExp("^" + user.username + "$", "i")}})
        .then(function(foundUser) {
            if(foundUser) { // if user is found, the following error is generated and sent to client (phase 1 passed but phase 2 failed):
                console.log('Username Creation Validation ERROR...existing user has been found...validation failed...', foundUser);
                var err = new Error('Username already exists.');
                next(err);
            }
            if(!foundUser) { // if user is not found, then user can proceed to be created
                console.log('Username duplicate check PASSED...no existing users found...now checking email...');
                User.findOne({email: { $regex : new RegExp("^" + user.email + "$", "i")} })
                    .then(function(foundEmail) {
                        if(foundEmail) {
                            console.log("Existing email already in DB");
                            err = new Error('Email is already registered.');
                            next(err);
                        }
                        if(!foundEmail) {
                            next();
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
            }
        })
        .catch(function(err) { // if our regex query goes awry this will catch any errors:
            console.log('Error performing case insensitive query to MongoDB...', err);
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

    bcrypt.hash(self.password, 10) // will return a promise
        .then(function(hash) {
            console.log('Hashing Password...');
            self.password = hash; // updates p/w entry to hash
            // Validation 1: Username: Alphanumer and underscore Regex Check:
            if (self.alphaumerUsernameCheck(self.username)) { // if phase 1 validation returns as true, check for duplicates (phase 2)
                console.log('Username Creation Validation PASSED basic alphanum + underscore validation...');
                // Duplicate Check (Username and Email) via Case Insensitive Mongoose Queries:
                self.checkDuplicates(self, next);
                // Encrypts our Password:
            } else {
                console.log('Username Creation Validation ERROR...');
                var err = new Error('Username may contain only letters, numbers or underscores.');
                console.log(err);
                next(err);
            };
        })
        .catch(next); // catches any errors


});

/***************************/
/*  CREATE MODEL & EXPORT  */
/***************************/

// Instantiate Mongoose Model:
var User = mongoose.model('User', UserSchema);

// Export Model:
module.exports = User;
