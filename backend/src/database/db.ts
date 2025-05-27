import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    if (!process.env.DB_URI) throw new Error("DB_URI not found.")
    const conn = await mongoose.connect(process.env.DB_URI)
    console.log(`Database connected: ${conn.connection.host}`)
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
