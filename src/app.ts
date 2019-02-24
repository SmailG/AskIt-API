require("dotenv").config();
import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { connection } from "./config/database";
import { tokenValidation } from "./helpers/auth";

const app = express();
const port = 1337;

connection.then( (conn: any) => {
    console.log(`connected: ${conn.isConnected}`);
}).catch((error: any) => console.log(error));

app.use((req: Request, res: Response, next: NextFunction) => {
    // FIX ME - shouldn't be any
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/**
 * ROUTES
 */
const auth = require("./routes/auth/index");
const user = require("./routes/user/index");
const question = require("./routes/question/index");
const answer = require("./routes/answer/index");

app.use("/api/v1/", auth);
app.use("/api/v1/", user);
app.use("/api/v1/", question);
app.use("/api/v1/", answer);

// start the Express server
app.listen({
    port: process.env.PORT || 3333,
    hostname: process.env.YOUR_HOST || "0.0.0.0",
    callback: () => console.log("W-API listening on port 3333!")
});
