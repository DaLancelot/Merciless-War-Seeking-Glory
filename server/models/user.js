var mongoose = require('mongoose');

var userDataSchema = new mongoose.Schema({
	name: String,
	pass: String,
	id: String,
	main: String,
	silver: Number
});

// make this available to our users in our Node applications
module.exports = mongoose.model('User', userDataSchema);
