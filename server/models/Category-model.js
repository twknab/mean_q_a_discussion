// Setup dependencies:
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Setup a schema:
var CategorySchema = new Schema (
    {
        name: {
            type: String,
            dropDups: true,
        },
    }
);

// Instantiate Mongoose Model:
var Category = mongoose.model('Category', CategorySchema);

// Export Model:
module.exports = Category;
