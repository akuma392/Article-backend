var express = require("express");
var User = require("../models/user");
var router = express.Router();
var auth = require("../middleware/auth");
/* GET home page. */
router.use(auth.verifyToken);
router.get("/:userId", async function (req, res, next) {
  try {
    var userId = req.params.userId;
    var profile = await User.findById(
      userId,
      "name email isAdmin articleId isBlock"
    );
    res.json({ profile });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
