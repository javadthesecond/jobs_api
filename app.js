require("dotenv").config();
const cookieParser = require("cookie-parser");

const authenticateUser = require("./middlewares/authentication");

// Router Imports
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// Importing middlewares
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const notFound = require("./middlewares/notFound");

// Importing DB functions
const connectDB = require("./db/connectDB");

// Express App
const express = require("express");
const app = express();
const path = require("path");
const { StatusCodes } = require("http-status-codes");

app.use(express.json());
app.use(cookieParser());

// Routing
app.use(express.static("public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);

// Starting Server
let port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`http://localhost:${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
