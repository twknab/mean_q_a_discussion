// Setup dependencies:
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Setup a schema:
var AnswerSchema = new Schema (
    {
        description: {
            type: String,
            minlength: [2, 'Answer body must be at least 2 characters.'],
            maxlength: [3000, 'Answer body must be less than 3000 characters.'],
            required: [true, 'Answer body is required.'],
            trim: true,
        }, // end description field
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        upVotes: {
            type: Number,
        },
        downVotes: {
            type: Number,
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
    },
    {
        timestamps: true,
    }
);

/**********************/
/*  INSTANCE METHODS  */
/**********************/
AnswerSchema.methods.initVote = function(){
    this.upVotes = 0;
    this.downVotes = 0;
    this.save();
    return true;
};

AnswerSchema.methods.upVote = function(){
    console.log('upvoting...');
    this.upVotes += 1;
    this.save();
    return true;
};

AnswerSchema.methods.downVote = function(){
    console.log('downvoting...');
    this.downVotes -= 1;
    this.save();
    return true;
};

AnswerSchema.methods.updateUser = function(id){
    console.log('updating user...', id);
    this.user = id;
    this.save();
    return true;
};

AnswerSchema.methods.addComment = function(id){
    console.log('pushing to comments array...', id);
    this.comments.push(id);
    this.save();
    return true;
};

AnswerSchema.methods.updatePostID = function(id){
    this.post = id;
    this.save();
    return true;
};

/*************************/
/*  PRE SAVE MIDDLEWARE  */
/*************************/

// Pre Save Hook:
// AnswerSchema.pre('save', function(next) {
//     var self = this;
//     self.commentCount = 0;
// });

/***************************/
/*  CREATE MODEL & EXPORT  */
/***************************/

// Instantiate Mongoose Model:
var Answer = mongoose.model('Answer', AnswerSchema);

// Export Model:
module.exports = Answer;
