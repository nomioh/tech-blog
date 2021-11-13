// import all models
const Posts = require("./Posts");
const User = require("./User");
const Comments = require("./Comments");

// // create associations
// User.hasMany(Posts, {
//   foreignKey: "user_id",
// });

Posts.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// User.hasMany(Comments, {
//   foreignKey: "user_id",
// });

Comments.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comments.belongsTo(Posts, {
//   foreignKey: "post_id",
// });

Posts.hasMany(Comments, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = { User, Posts, Comments };
