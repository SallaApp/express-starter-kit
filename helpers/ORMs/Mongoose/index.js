let mongoose = require("mongoose");
const env = require("../../../core/enviroment")

const server = env.DATABASE_SERVER // REPLACE WITH YOUR DB SERVER
const database = env.DATABASE_NAME // REPLACE WITH YOUR DB NAME
const username = env.DATABASE_USERNAME // REPLACE WITH YOUR DB USERNAME
const password = env.DATABASE_PASSWORD // REPLACE WITH YOUR DB PASSWORDrequire("./schemas/users");
require("./schemas/oauthtokens");
class Database {
  constructor() {
    this.Mongoose = mongoose;
    this._connect();
  }

  _connect() {
    this.Mongoose.connect(
      `mongodb+srv://${username}:${password}@${server}/${database}`
    )
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error", err);
      });
  }
}

module.exports = {
  connect: () => {
    return new Database();
  },
};
