const router = require("express").Router();
const sequelize = require("../config/connection");
const { Posts, User, Comments } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
  console.log("======================");
  Posts.findAll({
    attributes: ["id", "post_url", "title"],
    include: [
      {
        model: Comments,
        attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostsData) => {
      const posts = dbPostsData.map((post) => post.get({ plain: true }));

      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post by an id
router.get("/post/:id", (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "post_url",
      "title",
      "createdAt",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comments,
        attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostsData) => {
      if (!dbPostsData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      const post = dbPostsData.get({ plain: true });

      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// log in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// sign up
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
