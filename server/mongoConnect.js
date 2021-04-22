const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
// var multer = require('multer');
mongoose.Promise = global.Promise;
// TODO setup new user/pass that is not admin for general users
mongoose.connect("mongodb+srv://adminUser:adminPassword@cluster0.aplfp.mongodb.net/WerkItDB", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to WerkIt Database");
});

// development werkIt email account
var werkitAccount = null;
var transporter = null;
async function create_email_account() {
    werkitAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: werkitAccount.user,
            pass: werkitAccount.pass
        }
    });
}

// Schemas

const userSchema = new mongoose.Schema({
    name: String,
    user: String,
    pass: String,
    email: String,
    loc: String,
    pic: String,
    code: Number,
    dark_mode: Boolean,
    streak_counter: Number,
    challenges_won: Number,
    active_plan: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
    weekly_plan: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' }
    ],
    workouts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }
    ],
    workoutTypes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutType' }
    ],
    completed_workouts: [
        { type: mongoose.Schema.Types.ObjectId, ref: "CompletedWorkout" }
    ],
    friends_list: [
        { type: mongoose.Schema.Types.ObjectId, ref: "ConnectedFriends"}
    ],
    challenges: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Request' }
    ],
    requests: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Request' }
    ]
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

const wkoutSchema = new mongoose.Schema({
    name: String,
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutType' },
    exercises: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }
    ]
}, { versionKey: false });

const Workout = mongoose.model('Workout', wkoutSchema);

const exerciseSchema = new mongoose.Schema({
    name: String,
    data: {
        sets: Number,
        reps: Number,
        weight: Number,
        duration: Number,
        speed: Number,
        laps: Number,
        distance: Number,
        incline: Number,
        pace: Number
    }
}, { versionKey: false });

const Exercise = mongoose.model('Exercise', exerciseSchema);

const knownExerciseSchema = new mongoose.Schema({
    name: String,
    data: {
        sets: Boolean,
        reps: Boolean,
        weight: Boolean,
        duration: Boolean,
        distance: Boolean,
        pace: Boolean,
        incline: Boolean,
        laps: Boolean
    }
}, { versionKey: false });

const KnownExercise = mongoose.model('KnownExercise', knownExerciseSchema);

const wkoutTypeSchema = new mongoose.Schema({
    name: String,
    exercises: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }
    ]
}, { versionKey: false });

const WorkoutType = mongoose.model('WorkoutType', wkoutTypeSchema);

const workoutPlanSchema = new mongoose.Schema({
    name: String,
    // The following strings should be the name of a workout
    Monday: String,
    Tuesday: String,
    Wednesday: String,
    Thursday: String,
    Friday: String,
    Saturday: String,
    Sunday: String
}, { versionKey: false });

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

const completedWorkoutSchema = new mongoose.Schema({
    workout_name: String,
    day: String,
    date: Date,
    time: Number,
    type_name: String
}, { versionKey: false });

const CompletedWorkout = mongoose.model("CompletedWorkout", completedWorkoutSchema)

const friends = new mongoose.Schema({
    friend_name: String,
    friend_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    friend_goal: Number,
    friend_streak_counter: Number,
    pending: Boolean
}, { versionKey: false });

const ConnectedFriends = mongoose.model("ConnectedFriends", friends)

const request = new mongoose.Schema({
    type: String,
    friend: { type: mongoose.Schema.Types.ObjectId, ref: 'ConnectedFriends' },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
    num: Number
}, { versionKey: false});

const Request = mongoose.model("Request", request);

// var imageSchema = new mongoose.Schema({
//     name: String,
//     desc: String,
//     img:
//     {
//         data: Buffer,
//         contentType: String
//     }
// });
  
// const ProfilePic = new mongoose.model('ProfilePic', imageSchema);

// Functions called by server

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });

async function save_new_account_data(u_name, req_body) {

    const user = new User({
        name: u_name,
        user: req_body.username,
        pass: req_body.password,
        email: req_body.email,
        loc: null,
        pic: null,
        dark_mode: false,
        workouts: [],
        workoutTypes: [],
        active_plan: null,
        weekly_plan: [],
        completed_workouts: [],
        streak_counter: 0,
        challenges_won: 0,
        requests: [],
        challenges: []
    });

    user.save().then(_ => {
        generate_default_wkoutTypes(req_body.username);
    });

}

async function get_profile_info(username) {
    return await User.findOne({ user: username });
}

async function generate_default_wkoutTypes(username) {
    await save_new_workoutType(
        username, "Lifting", [{
                "name": "Bench",
                "data": {
                    "sets": true,
                    "reps": true,
                    "weight": true,
                    "duration": false,
                    "distance": false,
                    "pace": false,
                    "incline": false,
                    "laps": false
                }
            },
            {
                "name": "Squats",
                "data": {
                    "sets": true,
                    "reps": true,
                    "weight": true,
                    "duration": false,
                    "distance": false,
                    "pace": false,
                    "incline": false,
                    "laps": false
                }
            }
        ]);
    await save_new_workoutType(
        username, "Cardio", [{
                "name": "Running",
                "data": {
                    "sets": false,
                    "reps": false,
                    "weight": false,
                    "duration": true,
                    "distance": false,
                    "pace": true,
                    "incline": true,
                    "laps": false
                }
            },
            {
                "name": "Hiking",
                "data": {
                    "sets": false,
                    "reps": false,
                    "weight": false,
                    "duration": true,
                    "distance": false,
                    "pace": true,
                    "incline": true,
                    "laps": false
                }
            }
        ]);
}

async function check_login(user, pass) {
    return await User.exists({ user: user, pass: pass });
}

async function check_user_existence(username) {
    return await User.exists({ user: username });
}

async function validate_email(username, email) {
    var exists = await check_user_existence(username);
    console.log("exists: " + exists);
    if (exists) {
        console.log("Username exists")
        var user = await get_user_obj(username);
        if (user.email.localeCompare(email) == 0) {
            console.log("HERE")
            return true;
        } else {
            return false;
        }
    }
    console.log("exists2: " + exists);
    return exists;
}

async function send_email(username, email) {
    if (!(await validate_email(username, email))) {
        console.log("here");
        return 1;
    }
    var user = await get_user_obj(username);
    var code = Math.floor(Math.random() * (999999-100000) + 100000);
    var msg = 'Your six digit code is: ' + code.toString();
    var mailOptions = {
        from: 'do-not-reply@werkIt.com',
        to: email,
        subject: 'WerkIt Password Reset Requested',
        text: msg
    };
    await transporter.sendMail(mailOptions, async function(error, info) {
        if (error) {
            console.log("email error: " + error);
            return 2;
        } else {
            console.log('Email sent: ' + info.response);
            console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
        }
    });
    return await User.findByIdAndUpdate(
        user._id, {code: code}, {new: true}
    ).exec();
}

async function check_code(username, code) {
    var user = await get_user_obj(username);
    return (code == user.code);
}

async function change_password(user, new_pass) {
    if (!(await check_user_existence(user))) {
        // User does not exist
        throw 401;
    } else if (await check_login(user, new_pass)) {
        // New password is not different from old one
        throw 403;
    } else {
        return await User.findOneAndUpdate(
            { user: user }, { pass: new_pass, code: null }, { new: true }
        ).exec();
    }
}

async function update_darkmode(username) {
    var user = await get_user_obj(username);
    var mode = !user.dark_mode;
    return await User.findOneAndUpdate({ user: username }, { dark_mode: mode }, { new: true }).exec();
}

async function update_profile_field(username, field, data) {
    var user = await get_user_obj(username);
    console.log(user);
    return await User.findByIdAndUpdate(
        user._id, {
            [field]: data[field]
        }, { new: true }
    ).exec();
}

async function get_user_obj(username) {
    return await User.findOne({ user: username }).exec();
}

async function get_workout_obj(username, w_name) {
    var user = await get_user_obj(username);
    for (var wkout_id of user.workouts) {
        var wkout = await Workout.findById(wkout_id).exec();
        if (wkout.name == w_name) {
            return wkout;
        }
    }
}

async function get_plan_obj(username, p_name) {
    var user = await get_user_obj(username);
    for (var plan_id of user.weekly_plan) {
        var plan = await WorkoutPlan.findById(plan_id).exec();
        if (plan.name == p_name) {
            return plan;
        }
    }
}

async function get_workout_data(username, w_name) {
    var wkout = await get_workout_obj(username, w_name);
    var e_list = new Array;
    for (var e_id of wkout.exercises) {
        var e = await Exercise.findById(e_id).exec();
        e_list.push(e);
    }
    var type_obj = await WorkoutType.findById(wkout.type).exec();
    return {type: type_obj.name, exercises: e_list};
}

async function get_wkoutType_by_name(username, wkoutType) {
    var user = await get_user_obj(username);
    for (var id of user.workoutTypes) {
        var type = await WorkoutType.findById(id).exec();
        if (type.name == wkoutType) {
            return type;
        }
    }
}

async function save_new_exercise(username, w_name, e_name, data) {

    const exercise = new Exercise({
        name: e_name,
        data: data
    });

    exercise.save(function(err, exercise) {
        if (err) return console.error(err);
    });

    // gets the workout and adds exercise to the list
    var wkout = await get_workout_obj(username, w_name);
    var exercises = wkout.exercises;
    exercises.push(exercise);
    await Workout.findByIdAndUpdate(wkout._id, { exercises: exercises }, { new: true }).exec();
}

async function save_new_exerciseType(username, w_name, e_name, data) {

    var wkout = await get_wkoutType_by_name(username, w_name);
    for (var e_id of wkout.exercises) {
        var ex = await KnownExercise.findById(e_id);
        if (ex.name.localeCompare(e_name) == 0) {
            return false;
        }
    }

    const exercise = new KnownExercise({
        name: e_name,
        data: data
    });

    exercise.save(function(err, exercise) {
        if (err) return console.error(err);
    });

    // adds exercise to workoutType exercise list
    var exercises = wkout.exercises;
    exercises.push(exercise);
    await WorkoutType.findByIdAndUpdate(wkout._id, { exercises: exercises }, { new: true }).exec();
    return true;
}

async function save_new_workoutType(username, wt_name, exercises) {

    var user = await get_user_obj(username);
    for (var wtype_id of user.workoutTypes) {
        var wtype = await WorkoutType.findById(wtype_id);
        if (wtype.name.localeCompare(wt_name) == 0) {
            return false;
        }
    }

    const workoutType = new WorkoutType({
        name: wt_name,
        exercises: []
    });

    workoutType.save(function(err, workoutType) {
        if (err) return console.error(err);
    });

    // gets the user and add workout type to the list
    var query = { user: username };

    new_workouts = user.workoutTypes;
    new_workouts.push(workoutType);
    await User.findOneAndUpdate(
        query, { workoutTypes: new_workouts }, { new: true }
    ).exec();

    // add exercises to workoutType
    for (var e of exercises) {
        await save_new_exerciseType(username, wt_name, e.name, e.data);
    }
    return true;
}

async function save_workout(username, w_name, w_type, exercises) {

    var wkoutType = await get_wkoutType_by_name(username, w_type);
    const workout = new Workout({
        name: w_name,
        type: wkoutType,
        exercises: []
    });

    workout.save(function(err, workout) {
        if (err) return console.error(err);
    });

    console.log("new workout saved, adding workout to list");

    // gets the user and add workout to the list
    var query = { user: username };
    var user = await get_profile_info(username);
    new_workouts = user.workouts;
    new_workouts.push(workout);
    await User.findOneAndUpdate(query, { workouts: new_workouts }).exec();

    // add list of exercises to the workout
    for (var e of exercises) {
        await save_new_exercise(username, w_name, e.name, e.data);
    }
}

async function get_workouts(username) {
    var user = await get_profile_info(username);
    var wkouts = new Array;
    for (var obj_id of user.workouts) {
        var type = await Workout.findById(obj_id).exec();
        wkouts.push(type.name);
    }
    return wkouts;
}

async function get_workout_types(username) {
    var user = await get_profile_info(username);
    var knownTypes = new Array;
    for (var obj_id of user.workoutTypes) {
        var type = await WorkoutType.findById(obj_id).exec();
        knownTypes.push(type.name);
    }
    return knownTypes;
}

async function get_exercises_for_type(username, wkoutType) {
    var type = await get_wkoutType_by_name(username, wkoutType);
    var ex_list = new Array;
    for (var id of type.exercises) {
        var ex = await KnownExercise.findById(id).exec();
        ex_list.push({ name: ex.name, data: ex.data });
    }
    return ex_list;
}

async function get_exercise_obj(type_obj, exercise) {
    for (var ex_id of type_obj.exercises) {
        var ex_obj = await KnownExercise.findById(ex_id).exec();
        if (ex_obj.name.localeCompare(exercise) == 0) {
            return ex_obj;
        }
    }
}

async function get_active_plan(user) {
    return await WorkoutPlan.findById(user.active_plan).exec();
}

async function save_workout_plan(username, data) {
    var user = await get_user_obj(username);
    var plan = new WorkoutPlan(data);
    await plan.save();
    var plan_list = user.weekly_plan;
    plan_list.push(plan);
    await User.findByIdAndUpdate(
        user._id, { weekly_plan: plan_list }, { new: true }).exec();
}

async function save_completed_workout(username, data) {
    var user = await get_user_obj(username);
    var completed = new CompletedWorkout(data);
    await completed.save();

    var completed_wkouts = user.completed_workouts;
    completed_wkouts.push(completed);
    await User.findByIdAndUpdate(
        user._id, { completed_workouts: completed_wkouts }, { new: true }
    ).exec();

}

async function get_profile_field(username, field) {
    var user = await get_user_obj(username);
    return user[field];
}

async function get_weekly_goal(username) {
    var user = await get_user_obj(username);
    var goal = 0;
    var plan = await get_active_plan(user);
    if (plan.Monday.localeCompare("") != 0) {
        goal++;
    }
    if (plan.Tuesday.localeCompare("") != 0) {
        goal++;
    }
    if (plan.Wednesday.localeCompare("") != 0) {
        goal++;
    }
    if (plan.Thursday.localeCompare("") != 0) {
        goal++;
    }
    if (plan.Friday.localeCompare("") != 0) {
        goal++;
    }
    if (plan.Saturday.localeCompare("") != 0) {
        goal++;
    }
    if (plan.Sunday.localeCompare("") != 0) {
        goal++;
    }
    return goal;
}

async function get_completed_workouts(username) {
    var user = await get_user_obj(username);
    var plan = await get_active_plan(user);
    var progress = 0;
    for (var c_id of user.completed_workouts) {
        // TODO check if within current week
        var completed = await CompletedWorkout.findById(c_id).exec();
        if (completed.workout_name.localeCompare(plan.Monday) == 0 ||
            completed.workout_name.localeCompare(plan.Tuesday) == 0 ||
            completed.workout_name.localeCompare(plan.Wednesday) == 0 ||
            completed.workout_name.localeCompare(plan.Thursday) == 0 ||
            completed.workout_name.localeCompare(plan.Friday) == 0 ||
            completed.workout_name.localeCompare(plan.Saturday) == 0 ||
            completed.workout_name.localeCompare(plan.Sunday) == 0) {
            progress++;
        }
    }
    return progress;
}

async function get_histogram_data(username) {
    var user = await get_user_obj(username);
    var day_arr = ["Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday"
    ]

    var hist_obj = {
        "Monday": 0,
        "Tuesday": 0,
        "Wednesday": 0,
        "Thursday": 0,
        "Friday": 0,
        "Saturday": 0,
        "Sunday": 0
    };
    for (var day of day_arr) {
        var time = 0;
        for (var id of user.completed_workouts) {
            var completed = await CompletedWorkout.findById(id).exec();
            if (completed.day.localeCompare(day) == 0) {
                time += completed.time;
            }
        }
        hist_obj[day] = time;
    }
    return hist_obj;
}

async function get_geochart_data(username) {
    var user = await get_user_obj(username);
    var geo_obj = {
        You: user.loc
    };
    for (var f_id of user.friends_list) {
        var friend = await ConnectedFriends.findById(f_id).exec();
        var f_user = await User.findById(friend.friend_id).exec();
        geo_obj[friend.friend_name] = f_user.loc;
    }
    return geo_obj;
}

async function get_line_chart_data(username) {
    var user = await get_user_obj(username);
    var chart_obj = {
        'People': ['You'],
        'Monday': [],
        'Tuesday': [],
        'Wednesday': [],
        'Thursday': [],
        'Friday': [],
        'Saturday': [],
        'Sunday': []
    };
    var person_num = 0;
    for (var completed_id of user.completed_workouts) {
        var c_obj = await CompletedWorkout.findById(completed_id).exec();
        var time = chart_obj[c_obj.day][person_num]
        if (time == null) {
            chart_obj[c_obj.day][person_num] = c_obj.time;
        } else {
            time += c_obj.time;
            chart_obj[c_obj.day][person_num] = time;
        }
    }
    for (var f_id of user.friends_list) {
        person_num++;
        var f_obj = await ConnectedFriends.findById(f_id).exec();
        var f_user_obj = await User.findById(f_obj.friend_id).exec();
        var people = chart_obj['People'];
        people[person_num] = f_obj.friend_name;
        for (var c_id of f_user_obj.completed_workouts) {
            var c_obj = await CompletedWorkout.findById(c_id).exec();
            var time = chart_obj[c_obj.day][person_num]
            if (time == null) {
                chart_obj[c_obj.day][person_num] = c_obj.time;
            } else {
                time += c_obj.time;
                chart_obj[c_obj.day][person_num] = time;
            }
        }
    }
    for (var day in chart_obj) {
        if (day.localeCompare("People") == 0) {
            continue;
        }
        for (var i = 0; i < chart_obj["People"].length; i++) {
            if (chart_obj[day][i] == null) {
                chart_obj[day][i] = 0;
            }
        }
    }
    return chart_obj;
}

async function get_col_chart_data(username) {
    var user = await get_user_obj(username);
    var chart_obj = {};
    for (var c_id of user.completed_workouts) {
        var c_obj = await CompletedWorkout.findById(c_id).exec();
        var num = chart_obj[c_obj.type_name];
        if (num == null) {
            chart_obj[c_obj.type_name] = 1;
        } else {
            num++;
            chart_obj[c_obj.type_name] = num;
        }
    }
    return chart_obj;
}

async function get_all_plan_names(username) {
    var user = await get_user_obj(username);
    var list = new Array;
    for (var p_id of user.weekly_plan) {
        var plan = await WorkoutPlan.findById(p_id).exec();
        console.log("Get all plan names: " + p_id)
        list.push(plan.name);
    }
    return list;
}

async function get_workout_plan(username, plan_name) {
    var user = await get_user_obj(username);
    for (var p_id of user.weekly_plan) {
        var plan = await WorkoutPlan.findById(p_id).exec();
        if (plan.name.localeCompare(plan_name) == 0) {
            return plan;
        }
    }
}

async function update_active_plan(username, plan_name) {
    var user = await get_user_obj(username);
    var plan = await get_workout_plan(username, plan_name);
    return await User.findByIdAndUpdate(
        user._id, { active_plan: plan }, { new: true }
    ).exec();
}

async function get_active_plan_obj(username) {
    var user = await get_user_obj(username);
    return await WorkoutPlan.findById(user.active_plan).exec();
}

async function remove_workout(username, wkout) {
    var user = await get_user_obj(username);
    var wkout_obj = await get_workout_obj(username, wkout);
    var wkout_list = user.workouts;
    var index = wkout_list.indexOf(wkout_obj._id);
    wkout_list.splice(index, 1);
    await User.findByIdAndUpdate(
        user._id, {workouts: wkout_list}, {new: true}
    ).exec();
    return await Workout.findByIdAndDelete(wkout_obj._id).exec();
}

async function remove_plan(username, plan) {
    var user = await get_user_obj(username);
    var plan_obj = await get_plan_obj(username, plan);
    var plan_list = user.weekly_plan;
    var index = plan_list.indexOf(plan_obj._id);
    plan_list.splice(index, 1);
    await User.findByIdAndUpdate(
        user._id, {weekly_plan: plan_list}, {new: true}
    ).exec();
    var a_plan_obj = await WorkoutPlan.findById(user.active_plan).exec();
    if (a_plan_obj != null) {
        if (a_plan_obj.name.localeCompare(plan) == 0) {
            await User.findByIdAndUpdate(
                user._id, {active_plan: null}, {new: true}
            ).exec();
        }
    }
    return await WorkoutPlan.findByIdAndDelete(plan_obj._id).exec();
}

async function remove_type(username, type) {
    var user = await get_user_obj(username);
    var type_obj = await get_wkoutType_by_name(username, type);
    var type_list = user.workoutTypes;
    var index = type_list.indexOf(type_obj._id);
    type_list.splice(index, 1);
    await User.findByIdAndUpdate(
        user._id, {workoutTypes: type_list}, {new: true}
    ).exec();
    return await WorkoutType.findByIdAndDelete(type_obj._id).exec();
}

async function remove_exercise(username, wkout_type, exercise) {
    var type_obj = await get_wkoutType_by_name(username, wkout_type);
    var ex_obj = await get_exercise_obj(type_obj, exercise);
    var ex_list = type_obj.exercises;
    var index = ex_list.indexOf(ex_obj._id);
    ex_list.splice(index, 1);
    await WorkoutType.findByIdAndUpdate(
        type_obj._id, {exercises: ex_list}, {new: true}
    ).exec();
    return await KnownExercise.findByIdAndDelete(ex_obj._id).exec();
}

async function update_workout(username, wkout, new_wkout_obj) {
    await remove_workout(username, wkout);
    return await save_workout(
        username, new_wkout_obj.name, 
        new_wkout_obj.type, new_wkout_obj.exercises
    );
}

async function update_type_name(username, old_type, new_type) {
    var type_obj = await get_wkoutType_by_name(username, old_type);
    return await WorkoutType.findByIdAndUpdate(
        type_obj._id, {name: new_type}, {new: true}
    ).exec();
}

async function update_plan(username, plan, new_plan_data) {
    var active_plan = await get_active_plan_obj(username);
    var update_ap = false;
    if (active_plan != null) {
        if (active_plan.name.localeCompare(plan) == 0) {
            update_ap = true;
        }
    }
    await remove_plan(username, plan);
    await save_workout_plan(username, new_plan_data);
    if (update_ap) {
        await update_active_plan(username, new_plan_data.name);
    }
    return true;
}

async function add_friend(username, f_user, pending) {
    if (!(await check_user_existence(f_user))) {
        return 1;
    }
    var user = await get_user_obj(username);
    var friend_obj = await get_user_obj(f_user);

    for (var f_id of user.friends_list) {
        var f_obj = await ConnectedFriends.findById(f_id).exec();
        if (f_obj.friend_name.localeCompare(friend_obj.name) == 0) {
            return 2;
        }
    }

    const friend = new ConnectedFriends({
        friend_name: friend_obj.name,
        friend_id: friend_obj,
        friend_goal: 0,
        friend_streak_counter: 0,
        pending: pending
    });

    friend.save(function(err, friend) {
        if (err) return console.error(err);
    });

    var friends = user.friends_list;
    friends.push(friend);
    await User.findByIdAndUpdate(
        user._id, {friends_list: friends}, {new: true}
    ).exec();
    return 0;
}

async function get_friends(username) {
    var user = await get_user_obj(username);
    var friends = new Array;
    for (var id of user.friends_list) {
        var f = await ConnectedFriends.findById(id).exec();
        var f_user = await User.findById(f.friend_id);
        friends.push({username: f_user.user, name: f.friend_name});
    }
    return friends;
}

async function send_request(username, req_body) {
    var user = await get_user_obj(username);
    var friend = await get_user_obj(req_body.friend);
    var request = null;
    if (req_body.type.localeCompare("plan") == 0) {
        var plan = await get_workout_plan(username, req_body.plan)
        request = new Request({
            type: req_body.type,
            plan: plan._id,
            friend: user._id
        });
    } else if (req_body.type.localeCompare("challenge") == 0) {
        request = new Request({
            type: req_body.type,
            num: req_body.num,
            friend: user._id
        });
    } else if (req.body.type.localeCompare("friend") == 0) {
        request = new Request({
            type: req_body.type,
            friend: user._id
        });
        return 0;
    }
    request.save(function(err, request) {
        if (err) return console.error(err);
    });

    var requests = friend.requests;
    requests.push(request);
    return await User.findByIdAndUpdate(
        friend._id, {requests: requests}, {new: true}
    ).exec();
}

async function get_requests(username) {
    var req_arr = [];
    var user = await get_user_obj(username);
    for (var id of user.requests) {
        var req = await Request.findById(id).exec();
        var req_obj = {
            _id: req._id,
            type: req.type,
            friend_id: req.friend,
            num: req.num
        }
        if (req.plan != undefined) {
            var plan_obj = await WorkoutPlan.findById(req.plan).exec();
            req_obj['plan'] = plan_obj.name;
        }
        var friend_obj = await User.findById(req.friend).exec();
        req_obj['friend'] = friend_obj.name;
        req_arr.push(req_obj);
    }
    console.log("mongo connect: " + req_arr)
    return req_arr;
}

async function handle_request(username, action, body) {
    var user = await get_user_obj(username);
    if (action.localeCompare("accept") == 0) {
        var friend_user = await User.findById(body.friend_id).exec();
        // var friend_user = await get_user_obj(friend.friend_id);
        console.log("**Body: " + JSON.stringify(body))
        console.log("**Type: " + body.type)
        if (body.type.localeCompare("plan") == 0) {
            var plan_obj = await get_plan_obj(friend_user.user, body.plan);
            var plan_list = user.weekly_plan;
            plan_list.push(plan_obj);
            await User.findByIdAndUpdate(
                user._id, {weekly_plan: plan_list}, {new: true}
            ).exec();
            await Request.findByIdAndDelete(body._id).exec();
        } else if (body.type.localeCompare("challenge") == 0) {
            for (var person of [user, friend_user]) {
                var challenges = person.challenges;
                var chal = await Request.findById(body._id).exec();
                challenges.push(chal);
                await User.findByIdAndUpdate(
                    person._id, {challenges: challenges}, {new: true}
                ).exec();
            }
        } else if (body.type.localeCompare("friend") == 0) {
            await add_friend(user.username, friend_user.username, false);
            for (var cf_id of friend_user.friends_list) {
                var cf = await ConnectedFriends.findById(cf_id).exec();
                if (cf.friend_name.localeCompare(user.name) == 0) {
                    await ConnectedFriends.findByIdAndUpdate(
                        cf_id, {pending: false}, {new: true}
                    ).exec();
                }
            }
        }
    } else {
        if (body.type.localeCompare("friend") == 0) {
            for (var cf_id of friend_user.friends_list) {
                var cf = await ConnectedFriends.findById(cf_id).exec();
                if (cf.friend_name.localeCompare(user.name) == 0) {
                    await ConnectedFriends.findByIdAndDelete(cf_id).exec();
                }
            }
        }
        await Request.findByIdAndDelete(body._id).exec();
    }

    var req_list = user.requests;
    req_list.splice(req_list.indexOf(body._id), 1);
    return await User.findByIdAndUpdate(
        user._id, {requests: req_list}, {new: true}
    ).exec();
}


module.exports = {
    create_email_account,
    save_new_account_data,
    check_login,
    check_user_existence,
    change_password,
    save_new_exercise,
    save_workout,
    save_new_workoutType,
    get_profile_info,
    get_workout_types,
    save_new_exerciseType,
    get_exercises_for_type,
    get_workouts,
    get_workout_obj,
    get_workout_data,
    update_darkmode,
    save_workout_plan,
    get_profile_field,
    get_weekly_goal,
    get_completed_workouts,
    update_profile_field,
    save_completed_workout,
    get_histogram_data,
    get_workout_plan,
    update_active_plan,
    get_all_plan_names,
    get_active_plan_obj,
    remove_workout,
    remove_plan,
    remove_type,
    remove_exercise,
    update_workout,
    update_type_name,
    update_plan,
    add_friend,
    get_friends,
    get_geochart_data,
    get_line_chart_data,
    get_col_chart_data,
    send_request,
    get_requests,
    handle_request,
    send_email,
    check_code
}