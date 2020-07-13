 
var mongoose = require("mongoose");

var VideoSchema = new mongoose.Schema({
    title: String,
    embedUrl: String
});

module.exports = mongoose.model("Video", VideoSchema);
