// Import Deps
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const consolidate = require("consolidate");
const getUnixTimestamp = require("./helpers/getUnixTimestamp");
const bodyParser = require("body-parser");
const port = process.argv[2] || 8082;

/*
  Create a .env file in the root directory of your project. 
  Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
  SALLA_OAUTH_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  SALLA_OAUTH_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ...
*/
const {
  SALLA_OAUTH_CLIENT_ID,
  SALLA_OAUTH_CLIENT_SECRET,
  SALLA_OAUTH_CLIENT_REDIRECT_URI,
  SALLA_WEBHOOK_SECRET,
  SALLA_DATABASE_ORM,
} = process.env;

// Import Salla APIs
const SallaAPIFactory = require("@salla.sa/passport-strategy");
const SallaDatabase = require("./database")(SALLA_DATABASE_ORM || "Sequelize");
const SallaWebhook = require("@salla.sa/webhooks-actions");

SallaWebhook.setSecret(SALLA_WEBHOOK_SECRET);

// Add Listeners
SallaWebhook.on("app.installed", (eventBody, userArgs) => {
  // handel app.installed event
});
SallaWebhook.on("app.store.authorize", (eventBody, userArgs) => {
  // handel app.installed event
});
SallaWebhook.on("all", (eventBody, userArgs) => {
  // handel all events even thats not authorized
});

// we initialize our Salla API
const SallaAPI = new SallaAPIFactory({
  clientID: SALLA_OAUTH_CLIENT_ID,
  clientSecret: SALLA_OAUTH_CLIENT_SECRET,
  callbackURL: SALLA_OAUTH_CLIENT_REDIRECT_URI,
});

// set Listener on auth success
SallaAPI.onAuth(async (accessToken, refreshToken, expires_in, data) => {
  SallaDatabase.connect()
    .then(async (connection) => {
      let user_id = await SallaDatabase.saveUser({
        username: data.name,
        email: data.email,
        email_verified_at: getUnixTimestamp(),
        verified_at: getUnixTimestamp(),
        password: "",
        remember_token: "",
      }); 
      await SallaDatabase.saveOauth(
        {
          merchant: data.merchant.id,
          access_token: accessToken,
          expires_in: expires_in,
          refresh_token: refreshToken,
          user_id
        },
      );
    })
    .catch((err) => {
      console.log("Error connecting to database: ", err);
    });
});

//   Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete salla user is serialized
//   and deserialized.

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//   Use the Salla Strategy within Passport.
passport.use(SallaAPI.getPassportStrategy());
// save token and user data to your selected database

var app = express();

// configure Express
app.set("views", __dirname + "/views");
app.set("view engine", "html");

// set the session secret
// you can store session data in any database (monogdb - mysql - inmemory - etc) for more (https://www.npmjs.com/package/express-session)
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// serve static files from public folder
app.use(express.static(__dirname + "/public"));

// set the render engine to nunjucks

app.engine("html", consolidate.nunjucks);
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => SallaAPI.setExpressVerify(req, res, next));

// POST /webhook
app.post("/webhook", function (req, res) {
  SallaWebhook.checkActions(req.body, req.headers.authorization, {
    /* your args to pass to action files or listeners */
  });
});

// GET /oauth/redirect
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in salla authentication will involve redirecting
//   the user to accounts.salla.sa. After authorization, salla will redirect the user
//   back to this application at /oauth/callback
app.get(["/oauth/redirect", "/login"], passport.authenticate("salla"));

// GET /oauth/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/oauth/callback",
  passport.authenticate("salla", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

// GET /
// render the index page

app.get("/", async function (req, res) {
  let userDetails = { 
    user: req.user, 
    isLogin: req.user 
  }
  if (req.user){
    
    const userFromDB = await SallaDatabase.retrieveUser({ email: req.user.email }, true);
    const accessToken = userFromDB.oauthId.access_token;

    const userFromAPI = await SallaAPI.getResourceOwner(accessToken);

    // Merge user details with additional information from the API
    userDetails = { ...userDetails, ...userFromAPI };
     // mind you `req.user` content is almost the same as `user`,
     // the main purpose of calling  `await SallaAPI.getResourceOwner(access_token) `
     // is to show how to make calls with the access_toke
    
  }
  res.render("index.html", userDetails);
});

// GET /account
// get account information and ensure user is authenticated

app.get("/account", ensureAuthenticated, function (req, res) {
  res.render("account.html", {
    user: req.user,
    isLogin: req.user,
  });
});

// GET /refreshToken
// get new access token

app.get("/refreshToken", ensureAuthenticated, function (req, res) {
  SallaAPI.requestNewAccessToken(SallaAPI.getRefreshToken())
    .then((token) => {
      res.render("token.html", {
        token,
        isLogin: req.user,
      });
    })
    .catch((err) => res.send(err));
});

// GET /orders
// get all orders from user store

app.get("/orders", ensureAuthenticated, async function (req, res) {
  res.render("orders.html", {
    orders: await SallaAPI.getAllOrders(),
    isLogin: req.user,
  });
});

// GET /customers
// get all customers from user store

app.get("/customers", ensureAuthenticated, async function (req, res) {
  res.render("customers.html", {
    customers: await SallaAPI.getAllCustomers(),
    isLogin: req.user,
  });
});

// GET /logout
//   logout from passport
app.get("/logout", function (req, res) {
  SallaAPI.logout();
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
