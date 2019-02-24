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
const index_services_1 = require("../../models/answer/index.services");
const router = express_1.default.Router();
/**
 *
 */
router.get("/answer/getAnswers", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        // Specify question id
        result = yield index_services_1.AnswerService.getAnswers(req.query.id);
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
router.get("/answer/getAnswer", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.AnswerService.findOne(req.params.id);
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
router.post("/answer/create", auth_1.tokenValidation, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.AnswerService.create(req.body);
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
router.post("/answer/update", auth_1.tokenValidation, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.AnswerService.update(req.body.id, req.body.data);
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
router.put("/answer/vote", auth_1.tokenValidation, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.AnswerService.vote(req.body.answerId, req.body.userId, req.body.vote);
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
router.post("/answer/delete", auth_1.tokenValidation, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.AnswerService.remove(req.body);
    }
    catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }
    res.status(200).json(result);
}));
module.exports = router;
//# sourceMappingURL=index.js.map