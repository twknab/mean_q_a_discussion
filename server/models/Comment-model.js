// Setup dependencies:
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Setup a schema:
var CommentSchema = new Schema (
    {
        description: {
            type: String,
            minlength: [2, 'Post body must be at least 2 characters.'],
            maxlength: [3000, 'Post body must be less than 3000 characters.'],
            required: [true, 'Post body is required.'],
            trim: true,
        }, // end description field
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        answer: {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        },
    },
    {
        timestamps: true,
    }
);

/**********************/
/*  INSTANCE METHODS  */
/**********************/

CommentSchema.methods.updateUser = function(id){
    console.log('updating user...', id);
    this.user = id;
    this.save();
    console.log('done updating user...');
    return true;
};

CommentSchema.methods.addAnswer = function(id){
    console.log('adding answer...');
    this.answer = id;
    this.save();
    console.log('done adding answer...');
    return true;
};

/*************************/
/*  PRE SAVE MIDDLEWARE  */
/*************************/

// Pre Save Hook:
// CommentSchema.pre('save', function(next) {
//     var self = this;
//     self.commentCount = 0;
// });

/***************************/
/*  CREATE MODEL & EXPORT  */
/***************************/

// Instantiate Mongoose Model:
var Comment = mongoose.model('Comment', CommentSchema);

// Export Model:
module.exports = Comment;
