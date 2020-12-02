const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const nl2br  = require('nl2br');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Server for "Cinema Sys" - Angular Student\'s Project. Copyright 2020-2021 by Szymon Karolczuk.');
});

var con = mysql.createConnection({
	host: "194.59.141.155",
	user: "application",
	password: "rBUj9RdnYB",
	database: "cinema",
	multipleStatements: true
});

con.connect(function(err) {
	if(err) 
		throw err;
	else
		console.log("MYSQL - Connection successful");
});


app.get('/filmshow/all', (req, res) => {
	
	con.query("SELECT filmshows.*, movies.id AS movie_id, movies.title, movies.description, movies.duration, rooms.* FROM filmshows "
		+ "INNER JOIN movies ON filmshows.movie_id=movies.id "
		+ "INNER JOIN rooms ON filmshows.room_id=rooms.num", 
	function (err, result, fields) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		filmshows = [];
		result.forEach((r) => {
			
			filmshows.push({
				"id": r.id,
				"date": r.date,
				"movie": {
					"id": r.movie_id,
					"title": r.title,
					"description": r.description,
					"duration": r.duration
				},
				"room": {
					"num": r.num,
					"seats_cnt": r.seats_cnt
				},
				"occupied_seats": JSON.parse(r.occupied_seats)
			});
		});
		
		console.log(filmshows);
		
		console.log("GET /filmshow/all");
		res.send(filmshows);
	});
	
});

app.get('/filmshow/allfuture', (req, res) => {
	
	con.query("SELECT filmshows.*, movies.id AS movie_id, movies.title, movies.description, movies.duration, rooms.* FROM filmshows "
		+ "INNER JOIN movies ON filmshows.movie_id=movies.id "
		+ "INNER JOIN rooms ON filmshows.room_id=rooms.num WHERE filmshows.date >= NOW() ORDER BY filmshows.date ASC", 
	function (err, result, fields) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		filmshows = [];
		result.forEach((r) => {
			
			filmshows.push({
				"id": r.id,
				"date": r.date,
				"movie": {
					"id": r.movie_id,
					"title": r.title,
					"description": r.description,
					"duration": r.duration
				},
				"room": {
					"num": r.num,
					"seats_cnt": r.seats_cnt
				},
				"occupied_seats": JSON.parse(r.occupied_seats)
			});
		});
		
		console.log(filmshows);
		
		console.log("GET /filmshow/all");
		res.send(filmshows);
	});
	
});

app.get('/filmshow/date/:date', (req, res) => {
	
	con.query("SELECT filmshows.*, movies.id AS movie_id, movies.title, movies.description, movies.duration, rooms.* FROM filmshows "
		+ "INNER JOIN movies ON filmshows.movie_id=movies.id "
		+ "INNER JOIN rooms ON filmshows.room_id=rooms.num "
		+ "WHERE filmshows.date LIKE ? ORDER BY filmshows.date ASC", [req.params.date+'%'], 
	function (err, result, fields) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		if (!result || result.length < 1) {
            console.log("GET /filmshow/date/" + req.params.date);
			res.send([]);
            return;
        }
		
		filmshows = [];
		result.forEach((r) => {
			
			filmshows.push({
				"id": r.id,
				"date": r.date,
				"movie": {
					"id": r.movie_id,
					"title": r.title,
					"description": r.description,
					"duration": r.duration
				},
				"room": {
					"num": r.num,
					"seats_cnt": r.seats_cnt
				},
				"occupied_seats": JSON.parse(r.occupied_seats)
			});
		});
		
		console.log(filmshows);
		
		console.log("GET /filmshow/date/" + req.params.date);
		res.send(filmshows);
	});
	
});

app.get('/filmshow/today', (req, res) => {
	
	con.query("SELECT filmshows.*, movies.id AS movie_id, movies.title, movies.description, movies.duration, rooms.* FROM filmshows "
		+ "INNER JOIN movies ON filmshows.movie_id=movies.id "
		+ "INNER JOIN rooms ON filmshows.room_id=rooms.num "
		+ "WHERE filmshows.date >= NOW() AND DATE(filmshows.date) = CURDATE() ORDER BY filmshows.date ASC", [], 
	function (err, result, fields) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		if (!result || result.length < 1) {
            console.log("GET /filmshow/today");
			res.send([]);
            return;
        }
		
		filmshows = [];
		result.forEach((r) => {
			
			filmshows.push({
				"id": r.id,
				"date": r.date,
				"movie": {
					"id": r.movie_id,
					"title": r.title,
					"description": r.description,
					"duration": r.duration
				},
				"room": {
					"num": r.num,
					"seats_cnt": r.seats_cnt
				},
				"occupied_seats": JSON.parse(r.occupied_seats)
			});
		});
		
		console.log(filmshows);
		
		console.log("GET /filmshow/today");
		res.send(filmshows);
	});
	
});

app.get('/filmshow/:id', (req, res) => {
	
	con.query("SELECT filmshows.*, movies.id AS movie_id, movies.title, movies.description, movies.duration, rooms.* FROM filmshows "
		+ "INNER JOIN movies ON filmshows.movie_id=movies.id "
		+ "INNER JOIN rooms ON filmshows.room_id=rooms.num "
		+ "WHERE filmshows.id = ?", [req.params.id], 
	function (err, result, fields) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		if (!result || result.length < 1) {
            console.log("Can't find filmshow with id: " + req.params.id);
            res.status(500).send('Cant find filmshow with id: ' + req.params.id);
            return;
        }
		
		let r = result.shift();
		
		let filmshow = {
			"id": r.id,
			"date": r.date,
			"movie": {
				"id": r.movie_id,
				"title": r.title,
				"description": r.description,
				"duration": r.duration
			},
			"room": {
				"num": r.num,
				"seats_cnt": r.seats_cnt
			},
			"occupied_seats": JSON.parse(r.occupied_seats)
	};
		
		
		console.log("GET /filmshow/" + req.params.id);
		res.send(filmshow);
	});
	
});

app.put('/filmshow/:id', (req, res) => {
	
	let sql = "UPDATE filmshows SET title = ?, description = ?, duration = ? "
		+", movie_id = ?, room_id = ?, occupied_seats = ? WHERE id = ?";
	
	con.query(sql, [
		req.body.title, req.body.description, req.body.duration, 
		req.body.movie.id, req.body.room.num, JSON.stringify(req.body.occupied_seats), req.params.id
	],
	function (err, result) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
	
		console.log(result.affectedRows + " record(s) updated of filmshows");
		res.status(200).send(req.body);
	});
});

app.post('/filmshow', (req, res) => {
	
	let sql = "INSERT INTO filmshows (movie_id, date, room_id) VALUES (?, ?, ?)";
	
	con.query(sql, [
		req.body.movie.id, req.body.date, req.body.room.num
	],
	function (err, result) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		let insertId = result.insertId;
		
		
		con.query("SELECT filmshows.*, movies.id AS movie_id, movies.title, movies.description, movies.duration, rooms.* FROM filmshows "
		+ "INNER JOIN movies ON filmshows.movie_id=movies.id "
		+ "INNER JOIN rooms ON filmshows.room_id=rooms.num "
		+ "WHERE filmshows.id = ?", [insertId], 
		function (err, result, fields) {
			if (err) {
				console.log(err.sqlMessage);
				res.status(500).send(err.sqlMessage);
				return;
			}
			
			if (!result || result.length < 1) {
				console.log("Can't find filmshow with id: " + insertId);
				res.status(500).send('Cant find filmshow with id: ' + insertId);
				return;
			}
			
			let r = result.shift();
			
			let filmshow = 
			{
				"id": r.id,
				"date": r.date,
				"movie": {
					"id": r.movie_id,
					"title": r.title,
					"description": r.description,
					"duration": r.duration
				},
				"room": {
					"num": r.num,
					"seats_cnt": r.seats_cnt
				},
				"occupied_seats": JSON.parse(r.occupied_seats)
			};
			
			console.log("1 record inserted to filmshows");
			res.status(201).send(filmshow);
		});
	});
});

app.post('/filmshow/buy/:id/:seat', (req, res) => {
	
	let sql = "SELECT * FROM filmshows WHERE id = ?";
	
	con.query(sql, [req.params.id],
	function (err, result) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		let resultApi = {
			"status": 0,
			"message": "Wybrane miejsce jest już zajęte."
		};
		
		let occupied_seats = JSON.parse(result.shift().occupied_seats);
		if(occupied_seats.indexOf(parseInt(req.params.seat)) != -1) {
			console.log(resultApi);
			res.status(409).send(resultApi);
			return;
		}
		
		occupied_seats.push(parseInt(req.params.seat));
		let seats = JSON.stringify(occupied_seats);
	
		let sql2 = "UPDATE filmshows SET occupied_seats = ? WHERE id = ?";
		con.query(sql2, [
			seats, req.params.id
		],
		function (err, result) {
			if (err) {
				console.log(err.sqlMessage);
				res.status(500).send(err.sqlMessage);
				return;
			}
			
			resultApi.status = 1;
			resultApi.message = "Miejsce zostało zarezerwowane.";
		
			console.log(resultApi);
			res.status(200).send(resultApi);
		});
	});
});


app.get('/movie/all', (req, res) => {
	
	con.query("SELECT * FROM movies ", 
	function (err, result, fields) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		console.log("GET /movie/all");
		res.send(result);
	});
	
});

app.get('/movie/:id', (req, res) => {
	
	con.query("SELECT * FROM movies WHERE id = ?", [req.params.id], 
	function (err, result, fields) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		if (!result || result.length < 1) {
            console.log("Can't find movie with id: " + req.params.id);
            res.status(500).send('Cant find movie with id: ' + req.params.id);
            return;
        }
		
		console.log("GET /movie/" + req.params.id);
		res.send(result.shift());
	});
	
});

app.get('/movie/:id/filmshows', (req, res) => {
	
	con.query("SELECT filmshows.*, movies.id AS movie_id, movies.title, movies.description, movies.duration, rooms.* FROM filmshows "
		+ "INNER JOIN movies ON filmshows.movie_id=movies.id "
		+ "INNER JOIN rooms ON filmshows.room_id=rooms.num "
		+ "WHERE filmshows.movie_id = ? AND filmshows.date >= NOW() ORDER BY filmshows.date ASC", [req.params.id], 
	function (err, result, fields) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		let filmshows = [];
		result.forEach((r) => {
			
			filmshows.push({
				"id": r.id,
				"date": r.date,
				"movie": {
					"id": r.movie_id,
					"title": r.title,
					"description": r.description,
					"duration": r.duration
				},
				"room": {
					"num": r.num,
					"seats_cnt": r.seats_cnt
				},
				"occupied_seats": JSON.parse(r.occupied_seats)
			});
		});
		
		console.log(filmshows);
		
		console.log("GET /movie/"+ req.params.id +"/filmshows");
		res.send(filmshows);
	});
	
});

app.get('/movie/:id/filmshows/all', (req, res) => {
	
	con.query("SELECT filmshows.*, movies.id AS movie_id, movies.title, movies.description, movies.duration, rooms.* FROM filmshows "
		+ "INNER JOIN movies ON filmshows.movie_id=movies.id "
		+ "INNER JOIN rooms ON filmshows.room_id=rooms.num "
		+ "WHERE filmshows.movie_id = ? ORDER BY filmshows.date ASC", [req.params.id], 
	function (err, result, fields) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		let filmshows = [];
		result.forEach((r) => {
			
			filmshows.push({
				"id": r.id,
				"date": r.date,
				"movie": {
					"id": r.movie_id,
					"title": r.title,
					"description": r.description,
					"duration": r.duration
				},
				"room": {
					"num": r.num,
					"seats_cnt": r.seats_cnt
				},
				"occupied_seats": JSON.parse(r.occupied_seats)
			});
		});
		
		console.log(filmshows);
		
		console.log("GET /movie/"+ req.params.id +"/filmshows/all");
		res.send(filmshows);
	});
	
});

app.put('/movie/:id', (req, res) => {
	
	let sql = "UPDATE movies SET title = ?, description = ?, duration = ? WHERE id = ?";
	
	con.query(sql, [
		req.body.title, req.body.description, req.body.duration, req.params.id
	],
	function (err, result) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
	
		console.log(result.affectedRows + " record(s) updated of movies");
		res.status(200).send(req.body);
	});
});

app.post('/movie', (req, res) => {
	
	let sql = "INSERT INTO movies (title, description, duration) VALUES (?, ?, ?)";
	
	con.query(sql, [
		req.body.title, req.body.description, req.body.duration
	],
	function (err, result) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
	
		console.log("1 record inserted to movies");
		req.body.id = result.insertId;
		res.status(201).send(req.body);
	});
});

app.delete('/movie/:id', (req, res) => {
    
	let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";
	
	con.query(sql, [
		req.params.id, req.params.id
	],
	function (err, result) {
		if (err) {
			let resultApi = {
				"status": 0,
				"message": err.sqlMessage
			};
		
			console.log(resultApi);
			res.status(500).send(resultApi);
			return;
		}
		
		let resultApi = {
			"status": 1,
			"message": "Film został usunięty."
		}; 
	
		res.status(200).send(resultApi);
		console.log("Successfully deleted movie with id = " + req.params.id);
	});
	
});

app.get('/room/all', (req, res) => {
	
	con.query("SELECT * FROM rooms", 
	function (err, result, fields) {
		if (err) {
			console.log(err.sqlMessage);
			res.status(500).send(err.sqlMessage);
			return;
		}
		
		console.log("GET /room/all");
		res.send(result);
	});
	
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));