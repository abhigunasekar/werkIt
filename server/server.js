const express = require('express');
const mc = require('./mongoConnect')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const port = 8000;
// TODO set ip dynamically or figure out how to run server
// from anywhere - must match network used by expo though
const ip = "127.0.0.1";
//const lt = require('localtunnel');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// check connection with server
app.get('/', function (req, res) {
  console.log("Got GET request")
  res.status(200).end();
});

// create a new account
app.post('/create_account', (req, res) => {
  console.log("Request to create account"); 
  console.log(req.body);
  var name = req.body.f_name + " " + req.body.l_name;
  mc.check_user_existence(req.body.username).then(exists => {
    if (exists) {
      console.log("Username already exists.")
      res.status(403).end();
    } else {
      mc.save_new_account_data(name, req.body);
      console.log("Successfully created new user")
      res.status(201).end();
     }
   });
});

// log in
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
          res.status(403).end();
        } else {
          console.log("User does not exist - unsuccesful login");
          res.status(401).end();
        }
      });
    }
  });
});

// check user existence
app.get('/user/:username', (req, res) => {
  mc.check_user_existence(req.params.username).then(exists => {
    if (exists) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  });
});

// reset password
app.patch('/user/:username/profile', (req, res) => {
  mc.change_password(req.params.username, req.body.password).then(_ => {
    console.log("Successfully changed password for %s", req.params.username);
    res.status(204).end();
  }).catch(err => {
    var err_dict = {401 : "User does not exist - cannot change password",
                    403 : "Password is the same as the current one - enter different password"};
    console.log("%s", err_dict[err]);
    res.status(err).end();
  });
});

// get all user profile info
app.get('/profile/:username', (req, res) => {
  mc.get_profile_info(req.params.username).then(user => {
    console.log(user);
    res.status(200).json(user);
  })
});

// update one element of user profile info
app.patch('/profile/:username/:field', (req, res) => {

})

// get known workout types
app.get('/:username/workoutTypes', (req, res) => {
  console.log("Requesting known workout types");
  mc.get_workout_types(req.params.username).then(types => {
    console.log("Found known workout types: " + types);
    res.status(200).json(types);
  });
});

// set new workout type
// KNOWN BUG: only connects one exercise to user if multiple are sent (all are saved tho)
app.post('/:username/workoutType', (req, res) => {
  console.log("Saving new workout type to database for user: %s", req.params.username);
  mc.save_new_workoutType(
    req.params.username, req.body.name, req.body.exercises
  ).then(_ => {
    console.log("Successfully saved new workoutType");
    res.status(200).end();
  })
})

// get exercises given a workout type
app.get('/:username/:workoutType/exercises', (req, res) => {
  console.log("Getting exercises for workoutType: %s", req.params.workoutType);
  mc.get_exercises_for_type(req.params.username, req.params.workoutType).then(ex_list => {
    console.log("Exercises found: " + ex_list);
    res.status(200).json(ex_list);
  });
})

// add new exercise to a given workout type
// KNOWN BUG: changed exercise schema... fix this to match it
app.put('/:username/:workoutType/exercise', (req, res) => {
  console.log("Adding exercise to workoutType: %s", req.params.workoutType);
  mc.add_exercise_to_wkoutType(
    req.params.username, req.params.workoutType, req.body.exercise
  ).then(_ => {
    console.log("Successfully added exercise to workoutType");
    res.status(200).end();
  });
});

// save a new workout
app.post('/:username/workout', (req, res) => {
  console.log("saving new workout");
  console.log(req.body);
  console.log(req.params);
  mc.save_workout(req.params.username, req.body.name, req.body.type, req.body.exercises).then(_ => {
    res.status(200).end()
  });
});

app.listen(port, ip, function() {
    console.log("Server listening on http://%s:%d", ip, port);
});
