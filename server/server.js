const express = require('express');
const util = require('util');
const mc = require('./mongoConnect')
var bodyParser = require('body-parser');
const app = express();
const port = 8000;
const ip = "127.0.0.1";

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World!')
});

// TODO implement return status codes
app.post('/create_account', (req, res) => {
  console.log(req.body); 
  var name = req.body.f_name + " " + req.body.l_name;

  mc.save_new_account_data(
    name, req.body.username, req.body.password, req.body.email
  );
  res.send("Welcome " + name + "!\n\nPlease Download the Werk It Mobile App");
  var list = mc.get_user_pass(name);  // TODO pass prints as <pending> -- need to do research on async functions
  console.log(list);
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
    console.log(util.format("Server listening on %s:%d", ip, port));
})
