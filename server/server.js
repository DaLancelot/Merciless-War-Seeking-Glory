/* constants */
var express = require("express"),
	app = express(),
	server = require("http").Server(app),
	io = require("socket.io")(server),
	path = require('path'),
	mongoose = require("mongoose"),
	shortid = require("shortid"),
	userDataSchema = require("./models/user"),
	castleDataSchema = require("./models/castle");

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

var users = {};

/* setting up Mongoose */
mongoose.connect("mongodb://KingCosmic:lancelotforpresident@ds145289.mlab.com:45289/mwsg");

var Schema = mongoose.Schema;

var userData = userDataSchema;
var castleData = castleDataSchema;

/* socket io */
io.on('connection', function(socket) {
	console.log("a user connected");
	socket.on("register", function(data) {
		userData.findOne({name: data.name}, function (err, user) {
			if (user){
            socket.emit("err_register", {error : "Already registered with that username!"});
      } else {
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
        };
		});
	});
	socket.on("login", function(data) {
		userData.findOne({name: data.name}, function(err, user) {
			if (err) return console.error(err);

			if (data.pass == user.pass) {
				socket.id = user.id;
				users[socket.id] = socket;
				users[user.id].emit("loggedin", user);
				console.log(`${user.name} just logged in.`);
				castleData.findOne({id: user.main}, function(err, castle) {
					users[user.id].emit("loading", castle);
				});
			}
		})
	})
	socket.on("disconnect", function(data) {
		delete users[socket.id];
	})

	app.get('/:user', function(req, res) {
		userData.findOne({name : req.params.user}, function(err, user) {
			if (err) {
				console.log(err);
			} else {
				castleData.findOne({id: user.main}, function(err, castle) {
					res.render('index', {
						owner : castle.owner,
						silver : user.silver,
						buildings: castle.buildings
					});
				});
			};
		});
	});

});

/* express */

app.get('/', function(req, res) {
	res.sendFile('index.html');
});

server.listen(3000, function() {
	console.log("listening on: 3000");
});
