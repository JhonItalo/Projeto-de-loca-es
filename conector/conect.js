	const mongoose = require("mongoose");
	
	mongoose.connect("mongodb://localhost/plataforma");
	mongoose.Promise = global.Promise;

	module.exports = mongoose;