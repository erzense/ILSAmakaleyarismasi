const express = require("express");
const router = express.Router();
const { getHomepage, postHomepage } = require("../app_controller");

router.route("/").get(getHomepage).post(postHomepage);

module.exports = router;
