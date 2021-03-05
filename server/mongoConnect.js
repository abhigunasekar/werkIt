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
		console.log("successfully created new user");
	});
}

async function get_user_pass(name) {
	return await User.find({ name: 'Katy'}).pass;
}

module.exports = { save_new_account_data, get_user_pass }

