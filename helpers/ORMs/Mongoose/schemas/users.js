let mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  email_verified_at: Number,
  verified_at: Number,
  password: String,
  remember_token: String,
}, { timestamps: true });
module.exports = mongoose.model("User", usersSchema);
