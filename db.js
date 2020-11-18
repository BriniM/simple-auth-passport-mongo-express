const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {DB_UNAME, DB_PWD, DB_URL, DB_NAME} = process.env;

mongoose.connect(
	`mongodb+srv://${DB_UNAME}:${DB_PWD}@${DB_URL}/${DB_NAME}`,
	{ useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = mongoose.Schema({ username: String, password: String });
userSchema.methods.validPassword = async function(password) {
	return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;