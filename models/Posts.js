const { Sequilize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Post model
class Posts extends Model {}
// create fields/columns for Post model
Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      unique: true,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    // freezeTableName: true,
    // underscored: true,
    modelName: "posts",
  }
);

module.exports = Posts;

// const seedPosts = () => Posts.bulkCreate(postData);

// module.exports = seedPosts;
