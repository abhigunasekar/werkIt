// Requiring module 
const assert = require('assert'); 

const request = require("request");

describe("WerkIt Server Testing", function() {
	
	it('Connection to Server', function(done) {
		request("http://127.0.0.1:8000/", function(error, response, body) {
			assert.equal(body, "Successful connection to werkIt server");
			done();
		});
	});

	it('Create Account Page', function(done) {
		request("http://127.0.0.1:8000/create_account", function(error, response, body) {
			assert.equal(response.statusCode, 404);
			done();
		});
	});

	it('Login Page', function(done) {
		request("http://127.0.0.1:8000/login", function(error, response, body) {
			assert.equal(response.statusCode, 404);
			done();
		});
	});

	it('Reset Password Page', function(done) {
		request("http://127.0.0.1:8000/user/:username/profile", function(error, response, body) {
			assert.equal(response.statusCode, 404);
			done();
		});
	});


});
