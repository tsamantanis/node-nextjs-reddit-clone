const mongoose = require("mongoose")
const assert = require("assert")

mongoose.Promise = global.Promise
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    function(err, db) {
        assert.equal(null, err)
        console.log("Connected successfully to database")

    // db.close(); turn on for testing
    }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"))
mongoose.set("debug", true)

module.exports = mongoose.connection
