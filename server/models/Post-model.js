// Setup dependencies:
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Setup a schema:
var PostSchema = new Schema (
    {
        topic: {
            type: String,
            minlength: [2, 'Post topic must be at least 2 characters.'],
            maxlength: [150, 'Post topic must be less than 150 characters.'],
            required: [true, 'Post topic is required.'],
            trim: true,
        }, // end post field
        description: {
            type: String,
            minlength: [2, 'Post body must be at least 2 characters.'],
            maxlength: [3000, 'Post body must be less than 3000 characters.'],
            required: [true, 'Post body is required.'],
            trim: true,
        }, // end description field
        category: {
            type: Number,
            required: [true, 'Category is required.']
        }, // end category field
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        commentCount: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);

/**********************/
/*  INSTANCE METHODS  */
/**********************/
PostSchema.methods.increaseCommentCount = function(){
    this.commentCount += 1;
    return this.save();
};

/*************************/
/*  PRE SAVE MIDDLEWARE  */
/*************************/

// Pre Save Hook:
// PostSchema.pre('save', function(next) {
//     var self = this;
//
//
// });

/***************************/
/*  CREATE MODEL & EXPORT  */
/***************************/

// Instantiate Mongoose Model:
var Post = mongoose.model('Post', PostSchema);

// Export Model:
module.exports = Post;
