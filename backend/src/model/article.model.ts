import mongoose from "mongoose"

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
  },
  {
    timestamps: true,
  }
)

const Article = mongoose.model("Article", articleSchema)

export default Article
