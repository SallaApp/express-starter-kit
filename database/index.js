///

class SallaDatabase {
  constructor(DATABASE_ORM) {
    this.Database = require("../helpers/ORMs/" + DATABASE_ORM);
    this.DATABASE_ORM = DATABASE_ORM;
  }
  async connect() {
    try {
      this.connection = await this.Database.connect();
      return this.connection;
    } catch (err) {
      console.log("Error connecting to database: ", err);
      return null;
    }
  }
  async saveUser(data) {
    if (this.DATABASE_ORM == "TypeORM") {
      var userRepository = this.connection.getRepository("User");
      userRepository
        .save({
          username: data.name,
          email: data.email,
          email_verified_at: getUnixTimestamp(),
          verified_at: getUnixTimestamp(),
          password: "",
          remember_token: "",
        })
        .then(function (savedUser) {
          console.log("User has been saved: ", savedUser);
          console.log("Now lets load all users: ");

          return userRepository.find();
        })
        .then(function (users) {
          console.log("All users: ", users);
        });
    }
    if (this.DATABASE_ORM == "Sequelize") {
      if (
        // if not found then create new user
        !(await this.connection.models.User.findOne({
          where: { email: data.email },
        }))
      ) {
        let user = await this.connection.models.User.create({
          username: data.name,
          email: data.email,
          email_verified_at: getUnixTimestamp(),
          verified_at: getUnixTimestamp(),
          password: "",
          remember_token: "",
        });
        return user.id;
      }
    }
    if (this.DATABASE_ORM == "Mongoose") {
      try {
        let userObj = this.connection.Mongoose.userModel({
          username: data.name,
          email: data.email,
          email_verified_at: getUnixTimestamp(),
          verified_at: getUnixTimestamp(),
          password: "",
          remember_token: "",
        });

        userObj.save();
        return userObj._id;
      } catch (err) {}
    }
  }
  async saveOauth(data, user_id) {
    if (this.DATABASE_ORM == "Sequelize") {
      if (
        // if not found then create new user
        !(await this.connection.models.User.findOne({
          where: { email: data.email },
        }))
      ) {
        this.connection.models.OauthTokens.create({
          user_id: user_id,
          merchant: data.store.id,
          access_token: data.accessToken,
          expires_in: data.expires_in,
          refresh_token: data.refreshToken,
        })
          .then((data) => {})
          .catch((err) => {
            console.log("error inserting oath toekn", err);
          });
      }
    }
    if (this.DATABASE_ORM == "Mongoose") {
      try {
        let oauthobj = this.connection.Mongoose.oauthTokenModel({
          user: user_id,
          merchant: data.store.id,
          access_token: data.accessToken,
          expires_in: data.expires_in,
          refresh_token: data.refreshToken,
        });

        oauthobj.save();
      } catch (err) {}
    }
  }
}
module.exports = (DATABASE_ORM) => new SallaDatabase(DATABASE_ORM);
