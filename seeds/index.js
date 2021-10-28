const seedUsers = require("./user-seeds");
const seedUsers = require("./user-seeds");
const seedPosts = require("./post-seeds");
const seedComments = require("./comment-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({
    force: true,
  });
  console.log("---DB SYNCED ---");
  await seedUser();
  console.log("--- USERS SEEDED ----");

  await seedPosts();
  console.log("---POSTS SEEDED---");

  await seedComments();
  console.log("--- COMMENTS SEEDED ---");

  process.exit(0);
};

seedAll();
