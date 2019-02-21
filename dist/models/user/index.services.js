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
class UserService {
    /**
     * Get list of user
     * @returns {Promise<User[]>}
     */
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_model_1.User.find();
        });
    }
    /**
     * Get list of user
     * @returns {Promise<User[]>}
     */
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_model_1.User.find({ select: ["email", "userId", "userName"] });
        });
    }
    /**
     * Get one user
     * @returns {Promise<User[]>}
     */
    static findOneBy(param, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (type === "email") {
                query = { Email: param };
            }
            else {
                query = { UserID: param };
            }
            return yield index_model_1.User.findOne(query);
        });
    }
    /**
     * Create user
     * @returns {Promise<User>}
     */
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_model_1.User.save(data);
            }
            catch (e) {
                return;
            }
        });
    }
    /**
     * Update customer
     * @returns {Promise<User>}
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_model_1.User.findOne({ userId: id });
                Object.keys(data).forEach((key) => {
                    if (key !== "userID") {
                        user[key] = data[key];
                    }
                });
                return yield index_model_1.User.save(user);
            }
            catch (e) {
                return e;
            }
        });
    }
    /**
     * Remove user
     * @returns {Promise<User>}
     */
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_model_1.User.findOne({ userId: id });
                return yield index_model_1.User.remove(user);
            }
            catch (e) {
                return e;
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=index.services.js.map