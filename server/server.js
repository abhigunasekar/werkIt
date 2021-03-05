const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 8000;

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://adminUser:adminPassword@cluster0.aplfp.mongodb.net/WerkItDB", {useNewUrlParser: true}); //alternate address if db connection does not work with default mongo port
//mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/WerkItDB");
console.log("Connected to WerkIt Database");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

var name = "";
var username = "";
var password = "";

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/create_account', (req, res) => {
  console.log(req.body); 
  name = req.body.f_name + " " + req.body.l_name;
  username = req.body.username;
  password = req.body.password;
  // res.send("Welcome " + name + "!\n\n" + "Please Download the Werk It Mobile App");

  var userSchema = new mongoose.Schema({
    name: String,
    user: String,
    pass: String
  });
  var User = mongoose.model("people", userSchema);
  var myData = new User(req.body); 			// Will add this back in
  myData.save()						// once I can figure out
  .then( item => {					// if server is receiving
	  res.send("item saved to database");		// input from client
  })
  .catch(err => {
    console.log(err);
	  res.status(400).send("unable to save to database");
  	});
});

app.patch('/user/:id/profile', (req, res) => {
    console.log(req.body);
    if (req.params.id == username) {
        password = req.body.password;
        res.send("your new password is " + password);
    } else {
        res.send("no user found");
    }
})

app.listen(8000, function() {
    console.log("server is running")
})
