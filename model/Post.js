const mongoose = require('mongoose');
const User = require('./User');

const Schema = mongoose.Schema;

const PostSchema  = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
});


module.exports = Post = mongoose.model('Posts', PostSchema);