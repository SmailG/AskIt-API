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
const index_services_1 = require("../../models/user/index.services");
const router = express_1.default.Router();
/**
 *
 */
router.post("/auth/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield auth_1.logInUser(req.body);
    }
    catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }
    res.status(result.status).json(result.send);
}));
/**
 *
 */
router.post("/auth/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.UserService.create(req.body);
    }
    catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }
    res.status(200).json(result);
}));
/**
 *
 */
router.get("/auth/refresh", (req, res, next) => {
    res.status(200).json({ token: "token" });
});
module.exports = router;
//# sourceMappingURL=index.js.map