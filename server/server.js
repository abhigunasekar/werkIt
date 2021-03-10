const express = require('express');
const util = require('util');
const mc = require('./mongoConnect')
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const ip = "10.0.0.48";

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  console.log("Got GET request")
  res.send('Successful connection to werkIt server')
});

app.post('/create_account', (req, res) => {
  console.log("Request to create account"); 
  var name = req.body.f_name + " " + req.body.l_name;
  mc.check_user_existence(req.body.username).then(exists => {
    if (exists) {
      console.log("Username already exists.")
      res.status(403).send("Username already exists in database.  Please choose a new one.");
    } else {
      mc.save_new_account_data(
        name, req.body.username, req.body.password, req.body.email
      );
      console.log("Successfully created new user")
      res.status(201).send("Welcome " + name + "!\n\nPlease Download the Werk It Mobile App");
    }
  });
});

app.post('/login', (req, res) => {
  console.log("Request to log in");
  mc.check_login(req.body.username, req.body.password).then(exists => {
    if (exists) {
      console.log("Login credentials match - successful login");
      res.status(204).end();
    } else {
      mc.check_user_existence(req.body.username).then(user_exist => {
        if (user_exist) {
          console.log("Invalid password - unsuccessful login");
          res.status(403).send("Invalid password");
        } else {
          console.log("User does not exist - unsuccesful login");
          res.status(401).send("User does not exist");
        }
      });
    }
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

app.listen(port, ip, function() {
    console.log(util.format("Server listening on http://%s:%d", ip, port));
})
