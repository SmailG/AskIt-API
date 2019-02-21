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
class AnswerService {
    /**
     * Get list of answers
     * @returns {Promise<Answer[]>}
     */
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_model_1.Answer.find();
        });
    }
    /**
     * Get list of answers
     * @returns {Promise<Answer[]>}
     */
    static getAnswers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_model_1.Answer.find({ select: ["question", "title", "content"] });
        });
    }
    /**
     * Get one answer
     * @returns {Promise<Answer>}
     */
    static findOneBy(param, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (type === "email") {
                query = { Email: param };
            }
            else {
                query = { answerId: param };
            }
            return yield index_model_1.Answer.findOne(query);
        });
    }
    /**
     * Create answer
     * @returns {Promise<Answer>}
     */
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_model_1.Answer.save(data);
            }
            catch (e) {
                return;
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
                const answer = yield index_model_1.Answer.findOne({ answerId: id });
                Object.keys(data).forEach((key) => {
                    if (key !== "aommentId") {
                        answer[key] = data[key];
                    }
                });
                return yield index_model_1.Answer.save(answer);
            }
            catch (e) {
                return e;
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
                const answer = yield index_model_1.Answer.findOne({ answerId: id });
                return yield index_model_1.Answer.remove(answer);
            }
            catch (e) {
                return e;
            }
        });
    }
}
exports.AnswerService = AnswerService;
//# sourceMappingURL=index.services.js.map