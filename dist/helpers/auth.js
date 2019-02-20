"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const index_services_1 = require("../models/user/index.services");
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
function validateAccess(route, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_services_1.UserService.findOneBy(userID, "userID").then((response) => __awaiter(this, void 0, void 0, function* () {
            // console.log('The userID contains the following information');
            // console.log(userID);
            if (!response) {
                return false;
            }
            return true;
        }));
    });
}
//# sourceMappingURL=auth.js.map