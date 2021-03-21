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
	workoutType: String,
	exerciseType: String,
});

userSchema.methods.get_pass = function() {
	console.log(this.pass);
	return this.pass;
}

// Functions called by server

const User = mongoose.model('User', userSchema)

function save_new_account_data(u_name, username, password, u_email) {
	
	const user = new User({
		name: u_name,
		user: username,
		pass: password,
		email: u_email,
		workoutType: NULL,
		exerciseType: NULL,
	});

	user.save(function (err, user) {
		if (err) return console.error(err);
	});
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

module.exports = { 
	save_new_account_data, check_login, 
	check_user_existence, change_password }

