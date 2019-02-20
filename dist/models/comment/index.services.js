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
class CommentService {
    /**
     * Get list of comments
     * @returns {Promise<Comment[]>}
     */
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_model_1.Comment.find();
        });
    }
    /**
     * Get list of comments
     * @returns {Promise<Comment[]>}
     */
    static getComments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_model_1.Comment.find({ select: ["Question", "Title", "Content"] });
        });
    }
    /**
     * Get one comment
     * @returns {Promise<Comment>}
     */
    static findOneBy(param, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (type === "email") {
                query = { Email: param };
            }
            else {
                query = { CommentId: param };
            }
            return yield index_model_1.Comment.findOne(query);
        });
    }
    /**
     * Create comment
     * @returns {Promise<Comment>}
     */
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_model_1.Comment.save(data);
            }
            catch (e) {
                return;
            }
        });
    }
    /**
     * Update comment
     * @returns {Promise<Comment>}
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield index_model_1.Comment.findOne({ CommentId: id });
                Object.keys(data).forEach((key) => {
                    if (key !== "CommentId") {
                        comment[key] = data[key];
                    }
                });
                return yield index_model_1.Comment.save(comment);
            }
            catch (e) {
                return e;
            }
        });
    }
    /**
     * Remove comment
     * @returns {Promise<Comment[]>}
     */
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield index_model_1.Comment.findOne({ CommentId: id });
                return yield index_model_1.Comment.remove(comment);
            }
            catch (e) {
                return e;
            }
        });
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=index.services.js.map