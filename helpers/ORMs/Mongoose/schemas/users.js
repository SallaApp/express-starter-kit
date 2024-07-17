const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  email_verified_at: Number,
  verified_at: Number,
  password: String,
  remember_token: String,
  oauthId: { type: Schema.Types.ObjectId, ref: "oAuthToken",  required: false , default: null }, 

}, { timestamps: true });
module.exports = mongoose.model("User", usersSchema);
