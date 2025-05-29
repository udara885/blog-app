import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  createdAt: Date,
})

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
)

const Article = mongoose.model("Article", articleSchema)

export default Article
