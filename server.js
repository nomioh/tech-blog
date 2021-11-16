const express = require("express");
const exphbs = require("express-handlebars");

const session = require("express-session");
const path = require("path");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
require("dotenv").config();
const app = express();
const sessionStore = session.Store;
const SequelizeStore = require("connect-session-sequelize")(sessionStore);

const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  // secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// app.set("views", "./views");
app.use(routes);

// app.get("/", (req, res) => {
//   res.render("homepage", {
//     posts: [
//       {
//         id: 1,
//         title: "Post number 1",
//         post_url: "http://localhost:3001/post1",
//         user_id: 1,
//       },
//       {
//         id: 2,
//         title: "Post number 2",
//         post_url: "http://localhost:3001/post2",
//         user_id: 2,
//       },
//       {
//         id: 3,
//         title: "Post number 3",
//         post_url: "http://localhost:3001/post3",
//         user_id: 3,
//       },
//     ],
//   });
// });

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening ${PORT}`));
});
