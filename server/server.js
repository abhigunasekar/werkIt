const express = require('express');
const body_parser = require('body-parser');
const app = express();

const jsonParser = bodyParser.json();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/create_account', jsonParser, (req, res) => {
  console.log(req.body); 
  var account_info = req.body;
  res.send("hello " + account_info.name + "!");
});

app.listen(8000, function() {
    console.log("server is running")
})
