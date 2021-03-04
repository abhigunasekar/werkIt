var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/WerkItDB';
var str = "";
console.log("Past mongo db connect");

app.route('/people').get(function(req, res) {
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('name').find();
		cursor.forEach(function(item) {
			if (item != null) {
				str = str + " Name: " + item.name + "</br>";
			}
		}, function(err) {
			res.send(err);
			db.close();
			}
		);
	});
});
var server = app.listen(3000, function() {});
