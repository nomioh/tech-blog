const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const routes = require("./controllers");
const sequelize = require("./config/connection");
//const helpers = require("./utils/helpers");
require("dotenv").config();
const app = express();
const sessionStore = session.Store;
const SequelizeStore = require("connect-session-sequelize")(sessionStore);

const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({
  // helpers: {
  //   format_Date: (date) =>
  //     `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
  // },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(routes);

app.use(require("./controllers/"));
// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
//   sequelize.sync({ force: false });
// });

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
