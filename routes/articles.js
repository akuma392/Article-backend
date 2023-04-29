var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
var Article = require("../models/article");
var upload = require("../utils/multer");

router.get("/", async (req, res, next) => {
  try {
    let article = await Article.find({});
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
});

router.use(auth.verifyToken);

router.post("/", upload.single("file"), (req, res, next) => {
  req.body.owner = req.user?.userId;
  req.body.file = req.file?.filename;
  Article.create(req.body, (err, article) => {
    if (err) next(err);
    res.json(article);
  });
});

router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, item) => {
    if (err) next(err);
    res.status(200).json(item);
  });
});

// delete article
router.get("/:id/delete", (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id, (err, deletedItem) => {
    if (err) next(err);
    res.json(deletedItem);
  });
});

// update article
router.post("/:id/edit", (req, res) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedItem) => {
    if (err) next(err);
    res.redirect("/api/articles" + id);
  });
});

module.exports = router;
