import { NextFunction, Request, Response } from "express"
import Article from "../model/article.model"

interface customError extends Error {
  statusCode?: Number
}

export const getAllArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articles = await Article.find()
    res.status(200).json({ success: true, data: articles })
  } catch (error) {
    next(error)
  }
}

export const getArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) {
      const error: customError = new Error("Article not found")
      error.statusCode = 404
      throw error
    }
    res.status(200).json({ success: true, data: article })
  } catch (error) {
    next(error)
  }
}

export const addArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.body.title ||
      !req.body.image ||
      !req.body.description ||
      !req.body.category
    ) {
      const error: customError = new Error("Please fill all the fields.")
      error.statusCode = 406
      throw error
    }
    const article = await Article.create(req.body)
    res.status(201).json({ success: true, data: article })
  } catch (error) {
    next(error)
  }
}

export const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) {
      const error: customError = new Error("Article not found")
      error.statusCode = 404
      throw error
    }
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json({ success: true, data: updatedArticle })
  } catch (error) {
    next(error)
  }
}

export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) {
      const error: customError = new Error("Article not found")
      error.statusCode = 404
      throw error
    }
    await Article.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, message: "Article deleted." })
  } catch (error) {
    next(error)
  }
}
