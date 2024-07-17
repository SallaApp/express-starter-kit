///

class SallaDatabase {
  constructor(DATABASE_ORM) {
    this.Database = require("../helpers/ORMs/" + DATABASE_ORM);
    this.DATABASE_ORM = DATABASE_ORM;
  }
  async connect() {
    try {
      this.connection = this.connection  || await this.Database.connect();
      return this.connection;
    } catch (err) {
      console.log("Error connecting to database: ", err);
      return null;
    }
  }
  async retrieveUser(data,includeRelatedData) {
    if (this.DATABASE_ORM == "TypeORM") {
      var userRepository = this.connection.getRepository("User");
      userRepository
    }
    if (this.DATABASE_ORM == "Sequelize") {
      return await this.connection.models.User.findOne({
        where: { ...data },
      })
    }
    if (this.DATABASE_ORM == "Mongoose") {
    return includeRelatedData ?
      await this.connection.Mongoose.models.User.findOne(data).populate({
        path: 'oauthId',
        select: 'access_token' 
    }):
      await this.connection.Mongoose.models.User.findOne(data) 

    }

  }
    async saveUser(data) {
    if (this.DATABASE_ORM == "TypeORM") {
      var userRepository = this.connection.getRepository("User");
      userRepository
        .save(data)
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
        let user = await this.connection.models.User.create(data);
        return user.id;
      }
    }
    if (this.DATABASE_ORM == "Mongoose") {
      let userObj
      try {
        userObj =  await this.connection.Mongoose.models.User.findOneAndUpdate(
          { email:data.email },
           data ,
          { upsert: true, new: true }
        )
        console.log("user has been created")
        return userObj._id;
      } catch (err) { 
         
      }
    }
  }
  async saveOauth({user_id, ...data }) {
    if (this.DATABASE_ORM == "Sequelize") {
      if (
        // if not found then create new user exist, create an oath token
        await this.connection.models.User.findOne({
          where: { email: data.email },
        })
      ) {
        this.connection.models.OauthTokens.create({
          user_id: user_id,
          ...data
        })
          .then((data) => {
            return data
          })
          .catch((err) => {
            console.log("error inserting oath token", err);
          });
      }
    }
    if (this.DATABASE_ORM == "Mongoose") {
      try {
      return this.connection.Mongoose.models.oAuthToken.findOneAndUpdate(
          { user: user_id },
          { user: user_id, ...data },
          { upsert: true, new: true }
          ).then(async results => {
            await this.connection.Mongoose.models.User.findOneAndUpdate(
              { _id: user_id },
              { $set: {
                oauthId: results._id
              } },
              {  new: true }
            )
            return results
          });
      } catch (err) {
      }
    }
  }
}
module.exports = (DATABASE_ORM) => new SallaDatabase(DATABASE_ORM);
