const express = require('express');
const app = express();

app.use(express.json());

var name = "";
var username = "";
var password = "";

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/create_account', (req, res) => {
  console.log(req.body); 
  name = req.body.name;
  username = req.body.username;
  password = req.body.password;
  res.send("hello " + account_info.name + "!");
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
