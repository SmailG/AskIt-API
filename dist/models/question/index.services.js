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
const typeorm_1 = require("typeorm");
const index_model_1 = require("../user/index.model");
const index_model_2 = require("./index.model");
class QuestionService {
    /**
     * Get list of questions
     * @returns {Promise<Question[]>}
     */
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_model_2.Question.find();
        });
    }
    /**
     * Get list of questions
     * @returns {Promise<Question[]>}
     */
    static getQuestions(skip = 0, take = 20, criteria = "most-recent") {
        return __awaiter(this, void 0, void 0, function* () {
            let toFetch;
            if (criteria === "most-recent") {
                toFetch = yield typeorm_1.getRepository(index_model_2.Question).createQueryBuilder("question")
                    .select(["question.questionId"])
                    .leftJoin("question.answers", "answers")
                    .orderBy("question.questionId", "DESC")
                    .skip(skip)
                    .take(take)
                    .getMany();
            }
            else if (criteria === "most-answered") {
                toFetch = yield typeorm_1.getRepository(index_model_2.Question).createQueryBuilder("question")
                    .select(["question.questionId"])
                    .leftJoin("question.answers", "answers")
                    .orderBy("COUNT(answers.answerId)", "DESC")
                    .groupBy("question.questionId")
                    .offset(skip)
                    .limit(take)
                    .getMany();
            }
            else if (criteria === "most-upvoted") {
                toFetch = yield typeorm_1.getRepository(index_model_2.Question).createQueryBuilder("question")
                    .select(["question.questionId"])
                    .leftJoin("question.upvoters", "upvoters")
                    .orderBy("COUNT(upvoters.userId)", "DESC")
                    .groupBy("question.questionId")
                    .offset(skip)
                    .limit(take)
                    .getMany();
            }
            if (toFetch.length > 0) {
                try {
                    return yield typeorm_1.getRepository(index_model_2.Question).createQueryBuilder("question")
                        .select(["question.questionId", "question.content", "upvoters.userId", "downvoters.userId"])
                        .leftJoin("question.upvoters", "upvoters")
                        .leftJoin("question.downvoters", "downvoters")
                        .leftJoin("question.user", "u")
                        .leftJoin("question.answers", "answers")
                        .loadRelationCountAndMap("question.answerCount", "question.answers", "answerCount")
                        .where("question.questionId IN (:ids)", { ids: toFetch.map((q) => q.questionId) })
                        .getMany();
                }
                catch (e) {
                    throw e;
                }
            }
            else {
                throw new Error("No entries with selected ids");
            }
        });
    }
    /**
     * Get user specific questions
     * @returns {Promise<Question[]>}
     */
    static getQuestionsForUser(skip = 0, take = 20, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error("No user id provided");
            }
            try {
                if (!(yield index_model_1.User.findOne(userId))) {
                    throw new Error("User with specified id does not exist");
                }
                return yield typeorm_1.getRepository(index_model_2.Question).createQueryBuilder("question")
                    .select(["question.questionId", "question.content", "down.userId", "up.userId"])
                    .leftJoin("question.upvoters", "up")
                    .leftJoin("question.downvoters", "down")
                    .where("question.user = :userId", { userId })
                    .skip(skip)
                    .take(take)
                    .getMany();
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Get one question
     * @returns {Promise<Question>}
     */
    static findOne(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield typeorm_1.getRepository(index_model_2.Question).createQueryBuilder("question")
                    .select(["question.questionId", "question.content", "down.userId", "up.userId"])
                    .leftJoinAndSelect("question.answers", "a")
                    .leftJoin("question.upvoters", "up")
                    .leftJoin("question.downvoters", "down")
                    .where("question.questionId = :questionId", { questionId })
                    .getOne();
                if (res) {
                    return res;
                }
                else {
                    throw new Error("No question with that id");
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Create question
     * @returns {Promise<Question>}
     */
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data, "data");
            try {
                data.user = yield index_model_1.User.findOne(data.user);
                return yield index_model_2.Question.save(data);
            }
            catch (e) {
                console.log("error: ", e);
                throw e;
            }
        });
    }
    /**
     * Update question
     * @returns {Promise<Question>}
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield index_model_2.Question.findOne({ questionId: id });
                Object.keys(data).forEach((key) => {
                    if (key !== "questionId") {
                        question[key] = data[key];
                    }
                });
                return yield index_model_2.Question.save(question);
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Upvote/downvote question
     * @returns {Promise<Question>}
     */
    static vote(questionId, userId, vote) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield index_model_2.Question.findOne({ where: { questionId }, relations: ["upvoters", "downvoters"] });
                if (!question) {
                    throw new Error("Question with specified id not found");
                }
                const user = yield index_model_1.User.findOne({ userId });
                if (!user) {
                    throw new Error("User with specified id not found");
                }
                console.log(question, "question");
                let shouldRemoveVote;
                question.downvoters.find((u, index) => {
                    if (u.userId === Number(userId)) {
                        question.downvoters.splice(index, 1);
                        if (vote === "downvote") {
                            shouldRemoveVote = true;
                        }
                        return true;
                    }
                });
                question.upvoters.find((u, index) => {
                    if (u.userId === Number(userId)) {
                        question.upvoters.splice(index, 1);
                        if (vote === "upvote") {
                            shouldRemoveVote = true;
                        }
                        return true;
                    }
                });
                if (!shouldRemoveVote) {
                    vote === "upvote"
                        ? question.upvoters.push(user)
                        : question.downvoters.push(user);
                }
                return yield index_model_2.Question.save(question);
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Remove question
     * @returns {Promise<Question>}
     */
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield index_model_2.Question.findOne({ questionId: id });
                return yield index_model_2.Question.remove(question);
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.QuestionService = QuestionService;
//# sourceMappingURL=index.services.js.map