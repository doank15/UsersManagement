const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const mysql = require("mysql");

//Parsing middleware
//Parsing application x-www-form-urlendcoded
app.use(bodyParser.urlencoded({ extends: true }));

//Parse application/json
app.use(bodyParser.json());

//Static files
app.use(express.static("public"));

//Template View Engine
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "views");

const routes = require('./server/routes/user')
app.use('/', routes)

//listen
app.listen(PORT, () => {
  console.log(`Listening Port ${PORT}`);
});
