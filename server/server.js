/* constants */
const app = require("express")(),
	http = require("http").Server(app),
	io = require("socket.io")(http),
	mongoose = require("mongoose"),
	shortid = require("shortid");

var users = {};

/* setting variables */

var port = 3000;

/* setting up Mongoose */

mongoose.connect("mongodb://<user>:<password>@ds145289.mlab.com:45289/mwsg");

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
	name: String,
	pass: String,
	id: String,
	main: String,
	silver: Number
});

var castleDataSchema = new Schema({
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

var userData = mongoose.model("users", userDataSchema);
var castleData = mongoose.model("castles", castleDataSchema);
/* socket io */

io.on('connection', function(socket) {
	console.log("a user connected");
	socket.on("register", function(data) {
		console.log(data);
		let id = shortid.generate();
		let castleid = shortid.generate();
		let user = {
			name: data.name,
			pass: data.pass,
			id: id,
			main: castleid,
			silver: 500
		};

		let NewUser = new userData(user);

		NewUser.save(function(err, NewUser) {
			if (err) return console.log(err);
		});

		let castle = {
			owner: data.name,
			name: data.name,
			id: castleid,
			food: 250,
			wood: 1000,
			stone: 1000,
			iron: 1000,
			troops: {
				archers: 0,
				infantry: 0,
				calvary: 0,
				catapults: 0,
				carts: 0
			},
			buildings: {
				castle: {
					info: "most important part of your city",
					lvl: 1,
				},
				lumberyard: {
					info: "produces wood",
					lvl: 1
				},
				quarry: {
					info: "produces stone",
					lvl: 1
				},
				ironmine: {
					info: "produces iron",
					lvl: 1
				},
				farm: {
					info: "makes food to feed your army",
					lvl: 1
				},
				warehouse: {
					info: "holds your resources",
					lvl: 1
				},
				barracks: {
					info: "trains infantry",
					lvl: 1
				},
				archrange: {
					info: "trains archers",
					lvl: 1
				},
				siegeworkshop: {
					info: "crafts catapults",
					lvl: 1
				},
				horsestables: {
					info: "trains calvary",
					lvl: 1
				},
				market: {
					info: "makes carts",
					lvl: 1
				},
				wall: {
					info: "helps defend your castle",
					lvl: 1
				},
				hospital : {
					info: "heals some troops",
					lvl: 1
				}
			}
		};

		let NewCastle = new castleData(castle);

		NewCastle.save(function(err, NewCastle) {
			if (err) return console.log(err);
		});
	});
	socket.on("login", function(data) {
		userData.findOne({name: data.name }, function(err, user) {
			if (err) return console.error(err);

			if (data.pass == user.pass) {
				socket.id = user.id;
				users[socket.id] = socket;
				users[user.id].emit("loggedin", user);
			}
		})
	})
	socket.on("disconnect", function(data) {
		delete users[socket.id];
	})

});

/* express */

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

http.listen(port, function() {
	console.log("listening on: " + port);
});
