import { Router } from "express"
import {
  addArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  updateArticle,
} from "../controller/article.controller"

const articleRouter = Router()

articleRouter.get("/", getAllArticles)
articleRouter.get("/:id", getArticle)
articleRouter.post("/", addArticle)
articleRouter.put("/:id", updateArticle)
articleRouter.delete("/:id", deleteArticle)

export default articleRouter
