const { Comments } = require("../models");

const CommentsData = [
  {
    comment_text:
      "This helped me prepare for my interview! thanks for the article",
    user_id: 1,
    post_id: 5,
  },
  {
    comment_text: "asdf",
    user_id: 2,
    post_id: 4,
  },
  {
    comment_text: "Lorem ipsum",
    user_id: 3,
    post_id: 3,
  },
  {
    comment_text: "qwerrty",
    user_id: 4,
    post_id: 2,
  },
  {
    comment_text: "This was such a helpful article on ORMs! :) ",
    user_id: 5,
    post_id: 1,
  },
];
const seedComments = () => Comment.bulkCreate(commentsData);
module.exports = seedComments;
