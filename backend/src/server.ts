import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./database/db"
import articleRouter from "./routes/article.routes"
import errorMiddleware from "./middleware/error.middleware"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/articles", articleRouter)

app.use(errorMiddleware)

app.use("/", (req, res) => {
  res.send("API is active")
})

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  await connectDB()
})
