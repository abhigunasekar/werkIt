const express = require('express');
const mc = require('./mongoConnect')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
var http = require('http');
var fs = require('fs');
const { response } = require('express');
const port = 8000;
// TODO set ip dynamically or figure out how to run server
// from anywhere - must match network used by expo though
const ip = "127.0.0.1";
//const lt = require('localtunnel');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// check connection with server
app.get('/', function(req, res) {
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
            res.sendFile(path.join(__dirname, '../web-client/dashboard/dashboard.html'));
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
        var err_dict = {
            401: "User does not exist - cannot change password",
            403: "Password is the same as the current one - enter different password"
        };
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

// get known workout types
app.get('/:username/workoutTypes', (req, res) => {
    mc.get_workout_types(req.params.username).then(types => {
        //console.log(types);

    })
});

// set new workout type

// get exercises given a workout type

// add new exercise to a given workout type

// save a new workout
app.post('/:username/workout', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    mc.save_new_workout(req.params.username, req.body.name, req.body.type).then(_ => {
        req.body.exercises.forEach(exercise => {
            mc.save_new_exercise(req.body.name, exercise.name, exercise);
        });
    });
});

app.listen(port, ip, function() {
    console.log("Server listening on http://%s:%d", ip, port);
});