import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import signUpRouter from './routes/auth.route.js';

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DataBase is connected successfully"))
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("Server started at port 3000..."));
app.get("/", (req, res) => res.send("Hii"));

app.use("/api/user", userRouter);
app.use('/api/auth', signUpRouter);