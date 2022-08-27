const mongoose = require('mongoose');
const schema = mongoose.Schema;

const artistSchema = new schema({
	name: String,
});

module.exports = mongoose.model('Artist', artistSchema);
