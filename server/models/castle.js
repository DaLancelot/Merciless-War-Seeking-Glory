var mongoose = require('mongoose');

var castleDataSchema = new mongoose.Schema({
	owner: String,
	name: String,
	id: String,
	food: Number,
	wood: Number,
	stone: Number,
	iron: Number,
	troops: {
		archers: Number,
		infantry: Number,
		calvary: Number,
		catapults: Number,
		carts: Number
	},
	buildings: {
		castle: {
			info: String,
			lvl: Number,
		},
		lumberyard: {
			info: String,
			lvl: Number
		},
		quarry: {
			info: String,
			lvl: Number
		},
		ironmine: {
			info: String,
			lvl: Number
		},
		farm: {
			info: String,
			lvl: Number
		},
		warehouse: {
			info: String,
			lvl: Number
		},
		barracks: {
			info: String,
			lvl: Number
		},
		archrange: {
			info: String,
			lvl: Number
		},
		siegeworkshop: {
			info: String,
			lvl: Number
		},
		horsestables: {
			info: String,
			lvl: Number
		},
		market: {
			info: String,
			lvl: Number
		},
		wall: {
			info: String,
			lvl: Number
		},
		hospital: {
			info: String,
			lvl: Number
		}
	}
});

// make this available to our users in our Node applications
module.exports = mongoose.model('castles', castleDataSchema);
