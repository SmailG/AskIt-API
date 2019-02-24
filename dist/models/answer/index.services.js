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
const index_model_1 = require("../question/index.model");
const index_model_2 = require("../user/index.model");
const index_model_3 = require("./index.model");
class AnswerService {
    /**
     * Get list of answers
     * @returns {Promise<Answer[]>}
     */
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_model_3.Answer.find();
        });
    }
    /**
     * Get list of answers
     * @returns {Promise<Answer[]>}
     */
    static getAnswers(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!questionId || !index_model_1.Question.find(questionId)) {
                throw new Error("Specified question is not valid");
            }
            try {
                // return await Answer.find({ where: { question: questionId } });
                return yield typeorm_1.getRepository(index_model_3.Answer).createQueryBuilder("answer")
                    .select(["answer.answerId", "answer.content", "up.userId", "down.userId"])
                    .leftJoin("answer.upvoters", "up")
                    .leftJoin("answer.downvoters", "down")
                    .where("answer.question = :questionId", { questionId })
                    .getMany();
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Get one answer
     * @returns {Promise<Answer>}
     */
    static findOne(answerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getRepository(index_model_3.Answer).createQueryBuilder("answer")
                .select(["answer.answerId", "answer.content, up.userId, down.userId"])
                .leftJoinAndSelect("answer.upvoters", "up")
                .leftJoinAndSelect("anwer.downvoters", "down")
                .getOne();
        });
    }
    /**
     * Create answer
     * @returns {Promise<Answer>}
     */
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data, "data");
            try {
                return yield index_model_3.Answer.save(data);
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Update answer
     * @returns {Promise<Answer>}
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const answer = yield index_model_3.Answer.findOne({ answerId: id });
                Object.keys(data).forEach((key) => {
                    if (key !== "answerId") {
                        answer[key] = data[key];
                    }
                });
                return yield index_model_3.Answer.save(answer);
            }
            catch (e) {
                return e;
            }
        });
    }
    /**
     * Upvote/downvote answer
     * @returns {Promise<Answer>}
     */
    static vote(answerId, userId, vote) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const answer = yield index_model_3.Answer.findOne({ where: { answerId }, relations: ["upvoters", "downvoters"] });
                if (!answer) {
                    throw new Error("Answer with specified id not found");
                }
                const user = yield index_model_2.User.findOne({ userId });
                if (!user) {
                    throw new Error("User with specified id not found");
                }
                let shouldRemoveVote;
                answer.downvoters.find((u, index) => {
                    if (u.userId === Number(userId)) {
                        answer.downvoters.splice(index, 1);
                        if (vote === "downvote") {
                            shouldRemoveVote = true;
                        }
                        return true;
                    }
                });
                answer.upvoters.find((u, index) => {
                    if (u.userId === Number(userId)) {
                        answer.upvoters.splice(index, 1);
                        if (vote === "upvote") {
                            shouldRemoveVote = true;
                        }
                        return true;
                    }
                });
                if (!shouldRemoveVote) {
                    vote === "upvote"
                        ? answer.upvoters.push(user)
                        : answer.downvoters.push(user);
                }
                return yield index_model_3.Answer.save(answer);
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Remove answer
     * @returns {Promise<Answer[]>}
     */
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const answer = yield index_model_3.Answer.findOne({ answerId: id });
                return yield index_model_3.Answer.remove(answer);
            }
            catch (e) {
                return e;
            }
        });
    }
}
exports.AnswerService = AnswerService;
//# sourceMappingURL=index.services.js.map