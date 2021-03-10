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
		email: u_email
	});

	user.save(function (err, user) {
		if (err) return console.error(err);
	});
}

// const get_user_pass = async(name) => {
// 	console.log("here");
// 	var list = await User.find({ name: name}).exec();
// 	return list;
// }

async function get_user_pass(name) {
	var list = await User.find({ name: name}).exec();
	return list;
}

async function check_user_existence(username) {
	return await User.exists({ user: username });
}

module.exports = { save_new_account_data, get_user_pass, check_user_existence }

