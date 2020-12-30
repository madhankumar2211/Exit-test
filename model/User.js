const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	_id: {
		type: String,
		required:true
	},
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	address:{
		street:{
			type: String,
			required: true

		},
		suite:{
			type:String,
			required: true
		},
		city:{
			type: String,
			required:true
		},
		zipcode:{
			type: String,
			required: true
		},
		geo:{
			
			lat:{
				type: String,
				required: true
			},
			lng:{
				type:String,
				required: true
			},
			
		}
	
	},
	phone:{
		type: String,
		required: true
	},
	website:{
		type:String,
		required: true
	},

	company: {
		cname: {
			type: String,
			required: true
	},
	catchPhrase: {

		type: String,
		required: true
	},
	bs: {
		type: String,
		required: true
	}
	}	
});


module.exports = User = mongoose.model('users', UserSchema);

