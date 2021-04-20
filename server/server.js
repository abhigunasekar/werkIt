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

const ip = "10.0.0.86";
var urlencodedparser = bodyParser.urlencoded({ extended: false })
app.use(cors())

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

//const lt = require('localtunnel');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(methodOverride('_method'));


// check connection with server
app.get('/', function (req, res) {
    console.log("Got GET request")
    res.status(200).end();
});

// create a new account
// TODO check/do not allow username "user"
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
app.post('/login', (req, res) => {
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

// check validity of username/email and send email for resetting password
// app.post('/user/:username/email', (req, res) => {
//     console.log("Sending email (in process to reset password)")
//     mc.send_email(req.params.username, req.body.email).then(sent => {
//         if (sent) {
//             console.log("")
//             mc.send_email(req.params.username, req.body.email).then(_ => {
//                 res.status(200).end();
//             });
//         } else {
//             console.log("Invalid username or email");
//             res.status(400).end();
//         }
//     });
// });

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
    });
});

// update one element of user profile info
// ONLY use with fields that are not object ids
app.patch('/profile/:username/:field', (req, res) => {
    console.log("Updating " + req.params.field + "field for user " + req.params.username);
    mc.update_profile_field(req.params.username, req.params.field, req.body).then(_ => {
        res.status(200).end();
    });
});

// update dark mode
app.patch('/user/:username/darkmode', urlencodedparser, cors(), (req, res) => {
    console.log("here");
    console.log("Updating dark mode for user: " + req.params.username);
    mc.update_darkmode(req.params.username).then(user => {
        console.log("Successfully updated dark mode value to: " + user.dark_mode);
        res.status(200).end();
    });
});

// get any value in the user profile 
app.get('/:username/profile/:field', (req, res) => {
    console.log("Getting " + req.params.field + " field from user profile");
    mc.get_profile_field(req.params.username, req.params.field).then(val => {
        console.log("Successfully found value");
        res.status(200).json({
            [req.params.field]: val
        });
    })
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
app.post('/:username/workoutType', (req, res) => {
    console.log("Saving new workout type to database for user: %s", req.params.username);
    mc.save_new_workoutType(
        req.params.username, req.body.name, req.body.exercises
    ).then(saved => {
        if (saved) {
            console.log("Successfully saved new workoutType");
            res.status(200).end();
        } else {
            console.log("User already contains workout type with given name");
            res.status(400).end();
        }
    });
});

// get exercises given a workout type
app.get('/:username/:workoutType/exercises', (req, res) => {
    console.log("Getting exercises for workoutType: %s", req.params.workoutType);
    mc.get_exercises_for_type(req.params.username, req.params.workoutType).then(ex_list => {
        console.log("Exercises found");
        res.status(200).json(ex_list);
    });
});

// add new exercise to a given workout type
app.put('/:username/:workoutType/exercise', (req, res) => {
    console.log("Adding exercise to workoutType: %s", req.params.workoutType);
    mc.save_new_exerciseType(
        req.params.username, req.params.workoutType, req.body.name, req.body.data
    ).then(saved => {
        if (saved) {
            console.log("Successfully added exercise to workoutType");
            res.status(200).end();
        } else {
            console.log("Exercise within WorkoutType already exists with the name");
            res.status(400).end();
        }
    });
});

// save a new workout
// KNOWN BUG: first workout saved for user get undefined error
// "cannot read property exercises of undefined"
app.post('/:username/workout', (req, res) => {
    console.log("saving new workout");
    mc.save_workout(req.params.username, req.body.name, req.body.type, req.body.exercises).then(_ => {
        res.status(200).end();
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
app.get('/:username/workout/:workout', (req, res) => {
    console.log("Getting workout and respective exercises");
    mc.get_workout_data(req.params.username, req.params.workout).then(wkout => {
        console.log("Found workout:" + wkout);
        res.status(200).json(wkout);
    });
});

// save a completed workout
app.post('/:username/completed', (req, res) => {
    console.log("Saving completed workout");
    mc.save_completed_workout(req.params.username, req.body).then(_ => {
        res.status(200).end();
    });
});

// save a workout plan
app.post('/:username/workout_plan', (req, res) => {
    console.log("Saving workout plan");
    mc.save_workout_plan(req.params.username, req.body).then(_ => {
        res.status(200).end();
    });
});

// get a workout plan
app.get('/:username/workout_plan/:name', (req, res) => {
    console.log("Getting workout plan with the name: " + req.params.name);
    mc.get_workout_plan(req.params.username, req.params.name).then(plan => {
        res.status(200).json(plan);
    });
});

// get the name of each workout plan for a user
app.get('/:username/workout_plans', (req, res) => {
    console.log("Getting the name of each workout plan");
    mc.get_all_plan_names(req.params.username).then(names => {
        console.log("Found all the names");
        res.status(200).json(names);
    });
});

// change active status on workout plan
app.patch('/:username/workout_plan/:name', (req, res) => {
    console.log("Changing active status for plan: " + req.params.name);
    mc.update_active_plan(req.params.username, req.params.name).then(_ => {
        console.log("Successfully saved active status");
        res.status(200).end();
    });
});

// get the current active workout plan
app.get('/:username/active_plan', (req, res) => {
    console.log("Getting the current active workout plan");
    mc.get_active_plan_obj(req.params.username).then(plan => {
        console.log("Found active plan");
        res.status(200).json(plan);
    });
});

// get progress bar data
app.get('/:username/progress', (req, res) => {
    console.log("Getting user progress");
    mc.get_weekly_goal(req.params.username).then(goal => {
        console.log("Found goal: " + goal);
        mc.get_completed_workouts(req.params.username).then(progress => {
            console.log("Found progress: " + progress);
            res.status(200).json({
                expected: goal,
                actual: progress
            });
        });
    });
});

// get data for histogram
app.get('/:username/histogram', (req, res) => {
    console.log("Getting data for histogram");
    mc.get_histogram_data(req.params.username).then(data => {
        console.log("data found: " + data);
        res.status(200).send(data);
    });
});

// get data for geochart
app.get('/:username/geochart', (req, res) => {
    console.log("Getting data for geochart");
    mc.get_geochart_data(req.params.username).then(data => {
        console.log("data found: " + data);
        res.status(200).send(data);
    });
});

// get data for line chart
app.get('/:username/line_chart', (req, res) => {
    console.log("Getting data for line chart");
    mc.get_line_chart_data(req.params.username).then(data => {
        console.log("data found: " + data);
        res.status(200).send(data);
    });
});

// get data for column chart
app.get('/:username/col_chart', (req, res) => {
    console.log("Getting data for column chart");
    mc.get_col_chart_data(req.params.username).then(data => {
        console.log("data found: " + data);
        res.status(200).send(data);
    });
});


// delete workout
app.delete('/:username/:workout/rm_wkout', (req, res) => {
    console.log("Removing workout " + req.params.workout + " for user " + req.params.username);
    mc.remove_workout(req.params.username, req.params.workout).then(_ => {
        console.log("Workout successfully removed");
        res.status(200).end();
    });
});

// delete workout plan
app.delete('/:username/:plan/rm_plan', (req, res) => {
    console.log("Removing workout plan " + req.params.plan + " for user " + req.params.username);
    mc.remove_plan(req.params.username, req.params.plan).then(_ => {
        console.log("Workout plan successfully removed");
        res.status(200).end();
    });
});

// delete workout type
app.delete('/:username/:type/rm_type', (req, res) => {
    console.log("Removing workout type " + req.params.type + " for user " + req.params.username);
    mc.remove_type(req.params.username, req.params.type).then(_ => {
        console.log("Workout plan successfully removed");
        res.status(200).end();
    });
});

// delete known exercise from workout type
app.delete('/:username/:type/:exercise/rm_ex', (req, res) => {
    console.log("Removing exercise " + req.params.exercise +
                " for workout type " + req.params.type +
                " for user " + req.params.username);
    mc.remove_exercise(req.params.username, req.params.type, req.params.exercise).then(_ => {
        console.log("Exercise successfully removed");
        res.status(200).end();
    });
});

// edit workout
app.patch('/:username/:workout/edit_workout', (req, res) => {
    console.log("Updating workout " + req.params.workout + " for user " + req.params.username);
    mc.update_workout(req.params.username, req.params.workout, req.body).then(_ => {
        console.log("Successfully updated workout");
        res.status(200).end();
    });
});

// edit workout plan
app.patch('/:username/:plan/edit_plan', (req, res) => {
    console.log("Updating workout plan " + req.params.workout + " for user " + req.params.username);
    mc.update_plan(req.params.username, req.params.plan, req.body).then(_ => {
        console.log("Successfully updated workout");
        res.status(200).end();
    });
});

// edit workout type name
app.patch('/:username/:type/edit_workoutType', (req, res) => {
    console.log("Updating workout type " + req.params.type + " for user " + req.params.username);
    mc.update_type_name(req.params.username, req.params.type, req.body.name).then(_ => {
        console.log("Successfully updated workout type");
        res.status(200).end();
    });
});

// add a friend
app.post('/:username/add_friend', (req, res) => {
    console.log("Adding friend " + req.body.friend_user + " for user " + req.params.username);
    mc.add_friend(req.params.username, req.body.friend_user).then(rc => {
        if (rc == 0) {
            console.log("Successfully saved friend");
            res.status(200).end();
        } else if (rc == 1){
            console.log("Friend requested does not exist");
            res.status(400).end();
        } else {
            console.log("User is already friends with requested friend");
            res.status(401).end();
        }
    });
});

// get list of friends
app.get('/:username/friends', (req, res) => {
    console.log("Getting friends for user " + req.params.username);
    mc.get_friends(req.params.username).then(friends => {
        console.log("Successfully found friends");
        res.status(200).json(friends);
    });
});

// save plan or challenge request 
app.post('/:username/request', (req, res) => {
    console.log("Sending " + req.body.type + " request to friend " + req.body.friend);
    console.log(req.body)
    mc.send_request(req.params.username, req.body).then(_ => {
        console.log("Successfully sent request");
        res.status(200).end();
    });
});


app.listen(port, ip, function () {
    console.log("Server listening on http://%s:%d", ip, port);
});