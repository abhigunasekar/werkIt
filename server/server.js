const express = require('express');
const mc = require('./mongoConnect')
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const ip = "10.186.150.93";

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  console.log("Got GET request")
  res.send('Successful connection to werkIt server')
});

app.post('/web/create_account', (req, res) => {
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
      /*describe("User Creation", () => {
      	it("Successfully created new user", () => {
	  assert.equal(mc.check_user_existence(req.body.username, true));
	});
      });*/
     }
   });
});

app.post('/mobile/create_account', (req, res) => {
  console.log("Request to create account"); 
  var name = req.body.f_name + " " + req.body.l_name;
  mc.check_user_existence(req.body.username).then(exists => {
    console.log(exists);
    if (exists) {
      console.log("Username already exists.")
      res.status(403).json({data: "Username already exists in database.  Please choose a new one."});
    } else {
      mc.save_new_account_data(
        name, req.body.username, req.body.password, req.body.email
      );
      console.log("Successfully created new user")
      res.status(200).json({data: true});
    }
  });
});

app.post('/web/login', (req, res) => {
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

app.post('/mobile/login', (req, res) => {
  console.log("Request to log in");
  mc.check_login(req.body.username, req.body.password).then(exists => {
    if (exists) {
      console.log("Login credentials match - successful login");
      res.status(200).json({data: true});
    } else {
      mc.check_user_existence(req.body.username).then(user_exist => {
        if (user_exist) {
          console.log("Invalid password - unsuccessful login");
          res.status(403).json({data:"Invalid password"});
        } else {
          console.log("User does not exist - unsuccesful login");
          res.status(401).json({data: "User does not exist"});
        }
      });
    }
  });
});

app.get('/mobile/user/:username', (req, res) => {
  mc.check_user_existence(req.params.username).then(exists => {
    if (exists) {
      res.status(200).json({exists: true});
    } else {
      res.status(400).json({exists: false});
    }
  })
})

app.patch('/web/user/:username/profile', (req, res) => {
  mc.change_password(req.params.username, req.body.password).then(_ => {
    console.log("Successfully changed password for %s", req.params.username);
    res.status(204).end()
  }).catch(err => {
    var err_dict = {401 : "User does not exist - cannot change password",
                    403 : "Password is the same as the current one - enter different password"};
    console.log("%s", err_dict[err]);
    res.status(err).send(err_dict[err]);
  })
});

app.patch('/mobile/user/:username/profile', (req, res) => {
  mc.change_password(req.params.username, req.body.password).then(_ => {
    console.log("Successfully changed password for %s", req.params.username);
    res.status(200).json({data: true})
  }).catch(err => {
    var err_dict = {401 : "User does not exist - cannot change password",
                    403 : "Password is the same as the current one - enter different password"};
    console.log("%s", err_dict[err]);
    res.status(err).json({data: err_dict[err]});
  })
});

app.listen(port, ip, function() {
    console.log("Server listening on http://%s:%d", ip, port);
});
