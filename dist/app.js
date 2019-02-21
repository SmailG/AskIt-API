"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const database_1 = require("./config/database");
const auth_1 = require("./helpers/auth");
const app = express_1.default();
const port = 1337;
database_1.connection.then((conn) => {
    console.log(`connected: ${conn.isConnected}`);
}).catch((error) => console.log(error));
app.use((req, res, next) => {
    // FIX ME - shouldn't be any obviously
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
/**
 * ROUTES
 */
const auth = require("./routes/auth/index");
const user = require("./routes/user/index");
const question = require("./routes/question/index");
const answer = require("./routes/answer/index");
app.use("/api/v1/", auth);
app.use("/api/v1/", user);
app.use(auth_1.tokenValidation);
app.use("/api/v1/", question);
app.use("/api/v1/", answer);
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
// start the Express server
app.listen({
    port: process.env.PORT || 3333,
    hostname: process.env.YOUR_HOST || "0.0.0.0",
    callback: () => console.log("W-API listening on port 3333!")
});
//# sourceMappingURL=app.js.map