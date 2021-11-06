const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
// path
const path = require("path");

// hbs helper function
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

// hbs setup
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// express-session and sequelize:

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize");

// const sess = {
//   secret: "Super secret secret",
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
