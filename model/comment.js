const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CmntSchema = new Schema({
    postId:{
        type: String,
        required: true

    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }

});

module.exports = Comment = mongoose.model('Comments', CmntSchema);