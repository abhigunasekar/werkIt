var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// TODO setup new user/pass that is not admin for general users
mongoose.connect("mongodb+srv://adminUser:adminPassword@cluster0.aplfp.mongodb.net/WerkItDB", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected to WerkIt Database");
});

// Schemas

const userSchema = new mongoose.Schema({
	name: String,
	user: String,
	pass: String,
	email: String,
	dark_mode: Boolean,
	streak_counter: Number,
	weekly_plan: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan'}
	],
	workouts: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}
	],
	workoutTypes: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutType'}
	],
	completed_workouts: [
		{type: mongoose.Schema.Types.ObjectId, ref: "CompletedWorkout"}
	]
}, { versionKey: false});

const User = mongoose.model('User', userSchema);

const wkoutSchema = new mongoose.Schema({
	name: String,
	type: {type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutType'},
	exercises: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}
	]
}, { versionKey: false});

const Workout = mongoose.model('Workout', wkoutSchema);

// TODO fix schema
const exerciseSchema = new mongoose.Schema({
	name: String,
	data: [{
		sets: Number,
		reps: Number,
		weight: Number,
		duration: Number,
		speed: Number,
		laps: Number
	}]
}, { versionKey: false});

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
}, { versionKey: false});

const KnownExercise = mongoose.model('KnownExercise', knownExerciseSchema);

const wkoutTypeSchema = new mongoose.Schema({
	name: String,
	exercises: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}
	]
}, { versionKey: false});

const WorkoutType = mongoose.model('WorkoutType', wkoutTypeSchema);

const workoutPlanSchema = new mongoose.Schema({
	name: String,
	active: Boolean,
	// The following strings should be the name of a workout
	Monday: String,
	Tuesday: String,
	Wednesday: String,
	Thursday: String,
	Friday: String,
	Saturday: String,
	Sunday: String
}, { versionKey: false});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

const completedWorkoutSchema = new mongoose.Schema({
	workout_name: String,
	day: String,
	date: Date,
	time: Number
}, { versionKey: false});

const CompletedWorkout = mongoose.model("CompletedWorkout", completedWorkoutSchema)

// Functions called by server

async function save_new_account_data(u_name, req_body) {
	
	const user = new User({
		name: u_name,
		user: req_body.username,
		pass: req_body.password,
		email: req_body.email,
		dark_mode: false,
		workouts: [],
		workoutTypes: [],
		weekly_plan: [],
		completed_workouts: [],
		streak_counter: 0
	});

	user.save().then(_ => {
		generate_default_wkoutTypes(req_body.username);
	});

}

async function get_profile_info(username) {
	return await User.findOne({user: username});
}

async function generate_default_wkoutTypes(username) {
	await save_new_workoutType(
		username, "Lifting", [
			{"name": "Bench", "data": {
				"sets": true,
				"reps": true,
				"weight": true,
				"duration": false,
				"distance": false,
				"pace": false,
				"incline": false,
				"laps": false
			}},
			{"name": "Squats", "data": {
				"sets": true,
				"reps": true,
				"weight": true,
				"duration": false,
				"distance": false,
				"pace": false,
				"incline": false,
				"laps": false
			}}
		]);
	await save_new_workoutType(
		username, "Cardio", [
			{"name": "Running", "data": {
				"sets": false,
				"reps": false,
				"weight": false,
				"duration": true,
				"distance": false,
				"pace": true,
				"incline": true,
				"laps": false
			}},
			{"name": "Hiking", "data": {
				"sets": false,
				"reps": false,
				"weight": false,
				"duration": true,
				"distance": false,
				"pace": true,
				"incline": true,
				"laps": false
			}}
		]);
}

async function check_login(user, pass) {
	return await User.exists({ user: user, pass: pass });
}

async function check_user_existence(username) {
	return await User.exists({ user: username });
}

async function change_password(user, new_pass) {
	if (!(await check_user_existence(user))) {
		// User does not exist
		throw 401;
	} else if (await check_login(user, new_pass)){
		// New password is not different from old one
		throw 403;
	} else {
		return await User.findOneAndUpdate(
			{user: user}, {pass: new_pass}, {new: true}
			).exec();
	}
}

async function update_darkmode(username) {
	var user = await get_user_obj(username);
	var mode = !user.dark_mode;
	return await User.findOneAndUpdate(
		{user: username}, {dark_mode: mode}, {new: true}
		).exec();
}

async function update_profile_field(username, field, data) {
	var user = await get_user_obj(username);
	return await User.findByIdAndUpdate(
		user._id, {[field]: data[field]}, {new: true}
	).exec();
}

async function get_user_obj(username) {
	return await User.findOne({user: username}).exec();
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

async function get_workout_data(username, w_name) {
	var wkout = await get_workout_obj(username, w_name);
	var e_list = new Array;
	for (var e_id of wkout.exercises) {
		var e = await Exercise.findById(e_id).exec();
		e_list.push(e);
	}
	return e_list;
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

	exercise.save(function (err, exercise) {
		if (err) return console.error(err);
	});

	// gets the workout and adds exercise to the list
	var wkout = await get_workout_obj(username, w_name);
	var exercises = wkout.exercises;
	exercises.push(exercise);
	await Workout.findByIdAndUpdate(wkout._id, {exercises: exercises}, {new: true}).exec();
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

	exercise.save(function (err, exercise) {
		if (err) return console.error(err);
	});

	// adds exercise to workoutType exercise list
	var exercises = wkout.exercises;
	exercises.push(exercise);
	await WorkoutType.findByIdAndUpdate(wkout._id, {exercises: exercises}, {new: true}).exec();
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

	workoutType.save(function (err, workoutType) {
		if (err) return console.error(err);
	});

	// gets the user and add workout type to the list
	var query = {user: username};

	new_workouts = user.workoutTypes;
	new_workouts.push(workoutType);
	await User.findOneAndUpdate(
		query, {workoutTypes: new_workouts}, {new: true}
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

	workout.save(function (err, workout) {
		if (err) return console.error(err);
	});

	console.log("new workout saved, adding workout to list");

	// gets the user and add workout to the list
	var query = {user: username};
	var user = await get_profile_info(username);
	new_workouts = user.workouts;
	new_workouts.push(workout);
	User.findOneAndUpdate(query, {workouts: new_workouts}).exec();

	// add list of exercises to the workout
	for (var e of exercises) {
		await save_new_exercise(username, w_name, e.e_name, e.data);
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
		ex_list.push({name: ex.name, data: ex.data});
	}
	return ex_list;
}

async function get_active_plan(user) {
	for (var p_id of user.weekly_plan) {
		var plan = await WorkoutPlan.findById(p_id).exec();
		if (plan.active) {
			return plan;
		}
	}
}

async function save_workout_plan(username, data) {
	console.log("data:"+data);
	var user = await get_user_obj(username);

	if (data.active && user.weekly_plan.length > 0) {
		// deactivate previously active workout plan to set new one to active
		var prev_active = await get_active_plan(user);
		await WorkoutPlan.findByIdAndUpdate(
			prev_active._id, {active: false}, {new: true}
		).exec().catch();
	}

	var plan = new WorkoutPlan(data);
	await plan.save();
	var plan_list = user.weekly_plan;
	plan_list.push(plan);
	await User.findByIdAndUpdate(
		user._id, {weekly_plan: plan_list}, {new: true}).exec();
}

async function save_completed_workout(username, data) {
	var user = await get_user_obj(username);
	var completed = new CompletedWorkout(data);
	await completed.save();

	var completed_wkouts = user.completed_workouts;
	completed_wkouts.push(completed);
	await User.findByIdAndUpdate(
		user._id, {completed_workouts: completed_wkouts}, {new: true}
	).exec();

}

async function get_profile_field(username, field) {
	var user = await get_user_obj(username);
	return user[field];
}

async function get_weekly_goal(username) {
	var user = await get_user_obj(username);
	var goal = 0;
	console.log("user found:" + user);
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
	return goal;	// subtract count for name and active
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
				   "Friday", "Saturday", "Sunday"]

	var hist_obj = new Array;
	hist_obj.push(["Day", "Workout Time"]);
	for (var day of day_arr) {
		var time = 0;
		for (var id of user.completed_workouts) {
			var completed = await CompletedWorkout.findById(id).exec();
			if (completed.day.localeCompare(day) == 0) {
				time += completed.time;
			}
		}
		hist_obj.push([day, time]);
	}
	return hist_obj;
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

async function update_plan_status(username, plan_name, body) {
	var plan = await get_workout_plan(username, plan_name);
	return await WorkoutPlan.findByIdAndUpdate(
		plan._id, {"active": body.active}, {new: true}
	).exec();
}


module.exports = { 
	save_new_account_data, check_login, 
	check_user_existence, change_password,
	save_new_exercise, save_workout,
	save_new_workoutType, get_profile_info,
	get_workout_types, save_new_exerciseType,
	get_exercises_for_type, get_workouts,
	get_workout_obj, get_workout_data,
	update_darkmode, save_workout_plan,
	get_profile_field, get_weekly_goal, 
	get_completed_workouts, update_profile_field,
	save_completed_workout, get_histogram_data,
	get_workout_plan, update_plan_status }

