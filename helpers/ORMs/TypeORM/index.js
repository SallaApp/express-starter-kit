var typeorm = require("typeorm");

module.exports = {
  connect: () => {
    return typeorm.createConnection({
      type: "mysql",
      host: process.env.DATABASE_SERVER,
      //port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      entities: [require("./entity/oAuthToken"), require("./entity/User")],
    });
  },
};
