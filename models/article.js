var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleScehma = new Schema(
  {
    title: { type: String, required: true },
    likes: { type: Number, default: 0 },
    descriptions: { type: String },
    likedUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    types: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

var Article = mongoose.model("Article", articleScehma);

module.exports = Article;
