const { cleanEnv, str, url } = require("envalid")

const env = cleanEnv(process.env, {
  /**
   * The client ID assigned to you by Salla in Salla Partner Portal
   */
  SALLA_OAUTH_CLIENT_ID: str({
    default: "000000000000000000000000000",
  }),
  /**
   * The client password assigned to you by Salla in Salla Partner Portal
   */
  SALLA_OAUTH_CLIENT_SECRET: str({
    default: "xxxxxxxxxxxxxxxxxxxxx",
  }),
  /**
   * the /oauth/callback in your service
   */
  SALLA_OAUTH_CLIENT_REDIRECT_URI: url({
    default: "http://localhost:8081/oauth/callback",
  }),
  /**
   * https://github.com/SallaApp/express-starter-kit#configure-authorization-modes-
   */
  SALLA_AUTHORIZATION_MODE: str({
    choices: ["easy", "custom"],
    default: "easy",
  }),
  SALLA_APP_ID: str({
    default: "",
  }),
  // #Database
  /**
   * for production you might use a url
   */
  DB_CONNECTION_URL: str({
    default: "",
  }),
  DATABASE_USERNAME: str({
    default: "test",
  }),
  DATABASE_PASSWORD: str({
    default: "test",
  }),
  DATABASE_SERVER: str({
    default: "localhost",
  }),
  DATABASE_NAME: str({
    default: "test",
  }),
  SALLA_DATABASE_ORM: str({
    choices: ["Sequelize", "Mongoose", "TypeORM"],
    default: "Sequelize",
  }),
})

module.exports = {
  env,
}
