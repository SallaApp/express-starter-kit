var typeorm = require("typeorm");
const env = require("../../../core/enviroment")

module.exports = {
  connect: () => {
    return typeorm.createConnection({
      type: "mysql",
      host: env.DATABASE_SERVER,
      //port: 5432,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      synchronize: true,
      entities: [require("./entity/oAuthToken"), require("./entity/User")],
    });
  },
};
