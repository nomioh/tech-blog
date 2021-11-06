const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-route");
const dashboardRoutes = require("./dashboard-routes");

router.use("/home-route", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
