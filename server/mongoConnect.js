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
	workouts: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Workout'}
	],
	workoutTypes: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutType'}
	]
});

const User = mongoose.model('User', userSchema);

const wkoutSchema = new mongoose.Schema({
	name: String,
	type: {type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutType'},
	exercises: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}
	]
});

const Workout = mongoose.model('Workout', wkoutSchema);

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
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

const wkoutTypeSchema = new mongoose.Schema({
	name: String,
	exercises: []		// assumes exercises have unique names
});

const WorkoutType = mongoose.model('WorkoutType', wkoutTypeSchema);

// Functions called by server

async function save_new_account_data(u_name, username, password, u_email) {
	
	const user = new User({
		name: u_name,
		user: username,
		pass: password,
		email: u_email,
		workouts: [],
		workoutTypes: []
	});

	user.save().then(_ => {
		generate_default_wkoutTypes(username);
	});

}

async function generate_default_wkoutTypes(username) {
	await save_new_workoutType(username, "Lifting", ["Bench", "Squats"]);
	await save_new_workoutType(username, "Cardio", ["Running", "Hiking"]);
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

function save_new_exercise(w_name, e_name, data) {
	
	const exercise = new Exercise({
		name: e_name,
		data: data
	});

	exercise.save(function (err, exercise) {
		if (err) return console.error(err);
	});

	// gets the workout and adds exercise to the list
	var query = {name: w_name};
	Workout.findOne(query, function(err, wkout) {
		new_exercises = wkout.exercises;
		new_exercises.push(exercise);
		Workout.findOneAndUpdate(query, {exercises: new_exercises}).exec();
	});
}

async function save_new_workout(username, w_name, w_type) {
	
	console.log("saving new workout");
	console.log(username)
	const workout = new Workout({
		name: w_name,
		type: w_type,
		exercises: []
	});

	workout.save(function (err, workout) {
		if (err) return console.error(err);
	});

	console.log("new workout saved, adding workout to list");

	// gets the user and add workout to the list
	var query = {user: username};
	User.findOne(query, function(err, user) {
		console.log(user);
		console.log("found user: %s\n", user.username);
		new_workouts = user.workouts;
		new_workouts.push(workout);
		User.findOneAndUpdate(query, {workouts: new_workouts}).exec();
		console.log("workout added to list");
	});
	
}

async function save_new_workoutType(username, wt_name, exercises) {
	
	const workoutType = new WorkoutType({
		name: wt_name,
		exercises: exercises
	});

	workoutType.save(function (err, workoutType) {
		if (err) return console.error(err);
	});

	// gets the user and add workout type to the list
	var query = {user: username};
	await User.findOne(query, async function(err, user) {
		new_workouts = user.workoutTypes;
		new_workouts.push(workoutType);
		var x = await User.findOneAndUpdate(query, {workoutTypes: new_workouts}, {new: true}).exec();
	});

}

module.exports = { 
	save_new_account_data, check_login, 
	check_user_existence, change_password,
	save_new_exercise, save_new_workout,
	save_new_workoutType }

