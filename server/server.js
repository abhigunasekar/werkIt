const express = require('express')
const cors = require('cors')
const mc = require('./mongoConnect')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const app = express();
const path = require('path');
var http = require('http');
var fs = require('fs');
const { response } = require('express');
const port = 8000;
// TODO set ip dynamically or figure out how to run server
// from anywhere - must match network used by expo though

const ip = "127.0.0.1";
var urlencodedparser = bodyParser.urlencoded({ extended: false })

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

//const lt = require('localtunnel');


//app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(methodOverride('_method'));

// check connection with server
app.get('/', function(req, res) {
    console.log("Got GET request")
    res.status(200).end();
});

// create a new account
// bug fixed??
app.post('/create_account', urlencodedparser, cors(), (req, res) => {
    console.log("Request to create account");
    console.log(req.body);
    var name = req.body.f_name + " " + req.body.l_name;
    mc.check_user_existence(req.body.username).then(exists => {
        if (exists) {
            console.log("Username already exists.")
            res.status(403).end();
        } else {
            mc.save_new_account_data(name, req.body);
            console.log("Successfully created new user");
            res.status(200).end();
        }
    });
});

// log in
app.post('/login', urlencodedparser, cors(), (req, res) => {
    console.log("Request to log in");
    mc.check_login(req.body.username, req.body.password).then(exists => {
        if (exists) {
            console.log("Login credentials match - successful login");
            res.status(200).end();
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
        res.status(200).end();
    }).catch(err => {
        var err_dict = {
            401: "User does not exist - cannot change password",
            403: "Password is the same as the current one - enter different password"
        };
        console.log("%s", err_dict[err]);
        res.status(err).end();
    });
});

// get all user profile info
app.get('/profile/:username', cors(), (req, res) => {
    mc.get_profile_info(req.params.username).then(user => {
        console.log(user);
        res.status(200).json(user);
    })
});

// update one element of user profile info
app.patch('/profile/:username/:field', (req, res) => {

})

// update dark mode
app.patch('/user/:username/darkmode', (req, res) => {
  console.log("here");
  console.log("Updating dark mode for user: " + req.params.username);
  mc.update_darkmode(req.params.username, req.body.dark_mode).then(user => {
    console.log("Successfully updated dark mode value to: " + user.dark_mode);
    res.status(200).end();
  });
});

// get known workout types
app.get('/:username/workoutTypes', (req, res) => {
  console.log("Requesting known workout types");
  mc.get_workout_types(req.params.username).then(types => {
    console.log("Found known workout types: " + types);
    res.status(200).json(types);
  });
});

// set new workout type
// bug fixed??
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
    console.log("Exercises found");
    res.status(200).json(ex_list);
  });
})

// add new exercise to a given workout type
app.put('/:username/:workoutType/exercise', (req, res) => {
  console.log("Adding exercise to workoutType: %s", req.params.workoutType);
  mc.save_new_exerciseType(
    req.params.username, req.params.workoutType, req.body.name, req.body.data
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


// get workouts for a user
app.get('/:username/workouts', (req, res) => {
  console.log("Requesting workouts");
  mc.get_workouts(req.params.username).then(wkouts => {
    console.log("Found workouts: " + wkouts);
    res.status(200).json(wkouts);
  });
})

// get one workout/exercises by name
app.get('/:username/:workout', (req, res) => {
  console.log("Getting workout and repective exercises");
  mc.get_workout_data(req.params.username, req.params.workout).then(wkout => {
    console.log("Found workout:" + wkout);
    res.status(200).json(wkout);
  })
})

// TODO update workout
app.patch('/:username/:workout', (req, res) => {
  
})

// create weekly plan
app.post('/:username/plan', (req, res) => {
  console.log("Saving weekly workout plan");
  mc.save_workout_plan(req.params.username, req.body).then(_ => {
    console.log("Successfully saved workout plan");
    res.status(200).end();
  })
})

app.listen(port, ip, function() {
    console.log("Server listening on http://%s:%d", ip, port);
});