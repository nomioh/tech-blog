const { User } = require("../models");

const userData = [
  {
    username: "harleycodes",
    email: "harley@gmail.com",
    password: "enhance123",
  },
  {
    username: "james",
    email: "james@gmail.com",
    password: "enhance123",
  },
  {
    username: "erica",
    email: "erica_js@gmail.com",
    password: "enhance123",
  },
  {
    username: "mark",
    email: "mark@gmail.com",
    password: "enhance123",
  },
  {
    username: "max",
    email: "max@gmail.com",
    password: "enhance123",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
