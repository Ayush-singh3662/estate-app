import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import signUpRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import createListingRouter from './routes/listing.route.js';
import path from 'path';

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.json());

app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DataBase is connected successfully"))
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("Server started at port 3000..."));
app.get("/", (req, res) => res.send("Hii"));

app.use("/api/user", userRouter);
app.use('/api/auth', signUpRouter);
app.use('/api/listing', createListingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
})