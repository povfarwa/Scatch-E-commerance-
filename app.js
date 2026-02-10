import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import { fileURLToPath } from "url";
import { dirname } from "path";

import connectDB from "./db.js";

import indexRouter from "./routes/index.js";
import ownersRouter from "./routes/ownersRouter.js";
import usersRouter from "./routes/usersRouter.js";
import productsRouter from "./routes/productsRouter.js";

const app = express();

/* dirname fix for ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET || "development_secret",
  })
);

app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

/* DB */
await connectDB();

/* routes */
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

export default app;
