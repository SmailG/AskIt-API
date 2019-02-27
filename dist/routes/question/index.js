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
const index_services_1 = require("../../models/question/index.services");
const router = express_1.default.Router();
/**
 *
 */
router.get("/question/getQuestions", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.QuestionService.getQuestions(req.query.offset, req.query.take, req.query.criteria);
    }
    catch (e) {
        console.log("error: ", e);
        res.status(400).json({ error: "An error occurred" });
    }
    res.status(200).json(result);
}));
/**
 *
 */
router.get("/question/getUserQuestions", auth_1.tokenValidation, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.QuestionService.getQuestionsForUser(req.query.offset, req.query.take, req.query.id);
    }
    catch (e) {
        console.log("error: ", e);
        res.status(400).json({ error: "An error occurred" });
    }
    res.status(200).json(result);
}));
/**
 *
 */
router.get("/question", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.QuestionService.findOne(req.query.id);
    }
    catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred", message: error });
    }
    res.status(200).json(result);
}));
/**
 *
 */
router.post("/question", auth_1.tokenValidation, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    console.log(req.body, "body");
    try {
        result = yield index_services_1.QuestionService.create(req.body);
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
router.post("/question", auth_1.tokenValidation, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.QuestionService.update(req.body.id, req.body.data);
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
router.put("/question/vote", auth_1.tokenValidation, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.QuestionService.vote(req.body.questionId, req.body.userId, req.body.vote);
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
router.delete("/question", auth_1.tokenValidation, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result;
    try {
        result = yield index_services_1.QuestionService.remove(req.body);
    }
    catch (error) {
        console.log("error: ", error);
        res.status(400).json({ error: "An error occurred" });
    }
    res.status(200).json(result);
}));
module.exports = router;
//# sourceMappingURL=index.js.map