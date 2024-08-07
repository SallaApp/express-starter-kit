let mongoose = require("mongoose");

const server = process.env.DATABASE_SERVER; // REPLACE WITH YOUR DB SERVER
const database = process.env.DATABASE_NAME; // REPLACE WITH YOUR DB NAME
const username = process.env.DATABASE_USERNAME; // REPLACE WITH YOUR DB USERNAME
const password = process.env.DATABASE_PASSWORD; // REPLACE WITH YOUR DB PASSWORD
require("./schemas/users");
require("./schemas/oauthtokens");


const mongoServer = server == "localhost" ?
                  `mongodb://${server}:27017/${database}` :
                   `mongodb+srv://${username}:${password}@${server}/${database}`

class Database {
  constructor() {
    this.Mongoose = mongoose;
    this._connect();

  }
  _connect() {
    this.Mongoose.connect(mongoServer )
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
