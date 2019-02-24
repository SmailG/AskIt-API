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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
const index_model_1 = require("../models/user/index.model");
const index_services_1 = require("../models/user/index.services");
/**
 *
 */
exports.logInUser = (user) => __awaiter(this, void 0, void 0, function* () {
    if (!user.userName || !user.password) {
        return { status: 400, send: { error: "Username/password not provided" } };
    }
    const foundUser = yield index_model_1.User.findOne({ where: { userName: user.userName } });
    if (!foundUser) {
        return {
            status: 400,
            send: "There is no user with this username"
        };
    }
    else {
        const valid = yield bcrypt_1.default.compare(user.password, foundUser.password);
        if (!valid) {
            return {
                status: 400,
                send: "Invalid password"
            };
        }
        else {
            delete foundUser.password;
            return {
                status: 200,
                send: { user: foundUser, token: jsonwebtoken_2.default.sign({ userName: foundUser.userName, id: foundUser.userId }, process.env.SECRET_KEY) }
            };
        }
    }
});
/**
 *
 */
exports.tokenValidation = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: "No credentials sent!" });
    }
    if (req.headers.authorization.split(" ")[0] === "Bearer") {
        jsonwebtoken_1.verify(req.headers.authorization.split(" ")[1], process.env.SECRET_KEY, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ error: "Invalid credentials" });
            }
            if (yield validateAccess(req.originalUrl, decoded.id)) {
                res.locals.user = decoded;
                next();
            }
            else {
                res.json({ message: "access forbidden" });
            }
        }));
    }
};
/**
 *
 */
function validateAccess(route, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_services_1.UserService.findOneBy(userID, "userID").then((response) => __awaiter(this, void 0, void 0, function* () {
            if (!response) {
                return false;
            }
            return true;
        }));
    });
}
/**
 *
 */
//# sourceMappingURL=auth.js.map