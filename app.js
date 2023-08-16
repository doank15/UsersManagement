const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
const session = require("express-session");
dotenv.config({ path: "./config/config.env" });
const passport = require("passport");
// After you declare "app"
const GoogleStrategy = require("passport-google-oauth20").Strategy;
connectDB();
const app = express();
const setDisplayName = require('./server/middleware/setDisplayName');
const ErrorHandler = require('./server/middleware/error');


//Parsing middleware
//Parsing application x-www-form-urlendcoded
app.use(bodyParser.urlencoded({ extends: true }));


// serialization 
passport.serializeUser((user, done) => {
  done(null, user);
})

// deserialization
passport.deserializeUser((id, done) => {
  done(null, id); 
})


// google login middleware
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/oauth2/redirect/google',
    scope: ['profile']
  }, (accessToken, refreshToken, profile, done) => {
    // profile containts the user's GG information 
    return done(null, profile);
  }
));

//Parse application/json
app.use(bodyParser.json());
// session 
app.use(passport.initialize());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  rolling: true,
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
  }
}));
//Static files
app.use(express.static("public"));

//Template View Engine
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "views");

// display name for all page
app.use(setDisplayName);

// routes
const routes = require("./server/routes/Users");
const authRoutes = require("./server/routes/auth");
app.use("/", routes);
app.use("/", authRoutes);

// Error Handler middleware 
app.use(ErrorHandler);

// run server 
app.listen(PORT, () => {
  console.log(`Listening Port ${PORT}`);
});
