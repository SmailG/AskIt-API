"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../helpers/auth");
const router = express_1.default.Router();
/**
 *
 */
router.post("/auth/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // if (!user.userName || !user.password)
    // res.status(400).send({ error: 'Credentials not provided' });
    console.log(req.body.user, "User login procedure");
    let result;
    try {
        result = yield auth_1.logInUser(req.body.user);
    }
    catch (error) {
        res.status(400).json({ error: "An error occurred" });
    }
    res.status(result.status).json(result.send);
}));
/**
 *
 */
router.post("/auth/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
    // const code = req.body.code;
    // let token;
    // try {
    //     token = await getTokenFromCode(code);
    // } catch (error) {
    //     res.status(400).json({ error: 'An error occurred' });
    // }
    // res.status(200).json(token);
}));
/**
 *
 */
router.get("/auth/refresh", (req, res, next) => {
    res.status(200).json({ token: "token" });
});
module.exports = router;
//# sourceMappingURL=index.js.map