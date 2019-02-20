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
const index_model_1 = require("./index.model");
class QuestionService {
    /**
     * Get list of questions
     * @returns {Promise<Question[]>}
     */
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_model_1.Question.find();
        });
    }
    /**
     * Get list of questions
     * @returns {Promise<Question[]>}
     */
    static getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_model_1.Question.find({ select: ["User", "Title", "Content"] });
        });
    }
    /**
     * Get one question
     * @returns {Promise<Question>}
     */
    static findOneBy(param, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (type === "email") {
                query = { Email: param };
            }
            else {
                query = { QuestionId: param };
            }
            return yield index_model_1.Question.findOne(query);
        });
    }
    /**
     * Create question
     * @returns {Promise<Question>}
     */
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_model_1.Question.save(data);
            }
            catch (e) {
                return;
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
                const question = yield index_model_1.Question.findOne({ QuestionId: id });
                Object.keys(data).forEach((key) => {
                    if (key !== "QuestionId") {
                        question[key] = data[key];
                    }
                });
                return yield index_model_1.Question.save(question);
            }
            catch (e) {
                return e;
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
                const question = yield index_model_1.Question.findOne({ QuestionId: id });
                return yield index_model_1.Question.remove(question);
            }
            catch (e) {
                return e;
            }
        });
    }
}
exports.QuestionService = QuestionService;
//# sourceMappingURL=index.services.js.map