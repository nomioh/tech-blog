const router = require("express").Router();

const usersRoutes = require("./user-routes");
const postsRoutes = require("./post-routes");
const commentsRoutes = require("./comment-routes");

router.use("/users", usersRoutes);
router.use("/posts", postsRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;
