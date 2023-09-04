require("dotenv").config();

import express, { Express } from "express";
import cors from "cors"; //enables anyone to use the api
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// const connectDB = require("./src/db/db"); //import database
// connectDB();

// const transactions = require("./src/routers/transactions");
// const listings = require("./src/routers/listings");
import auth from "./src/routers/auth";
// const images = require("./src/routers/images");

//allows api to be called 100 times within 15min interval
const limit = rateLimit({
  windowMs: 1 * 60 * 1000, //1min
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

const app: Express = express();
app.use(cors());
app.use(helmet());
app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/auth",)
// app.use("/api", transactions);
app.use("/auth", auth);
// app.use("/api", images);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
