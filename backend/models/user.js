const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: { type: String, select: false },
    username: { type: String, required: true }
},
  {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);
