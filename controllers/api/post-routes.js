const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Posts, User, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
  console.log("======================");
  Posts.findAll({
    attributes: ["id", "post_url", "title", "createdAt", "vote_count"],
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
    .then((dbPostsData) => res.json(dbPostsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_url", "title", "vote_count"],
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
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Posts.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.session.user_id,
  })
    .then((dbPostsData) => res.json(dbPostsData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Posts.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostsData) => {
      if (!dbPostsData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Posts.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostsData) => {
      if (!dbPostsData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostsData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
