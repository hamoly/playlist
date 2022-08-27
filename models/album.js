const mongoose = require('mongoose');
const schema = mongoose.Schema;

const albumSchema = new schema({
	name: String,
	releaseDate: String,
	artistID: String,
});

module.exports = mongoose.model('Album', albumSchema);
