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
            if (data.password) {
                data.password = yield bcrypt_1.default.hash(data.password, 10);
            }
            console.log(data);
            try {
                return yield index_model_1.User.save(data);
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        });
    }
    /**
     * Change user password
     * @returns {Promise<User>}
     */
    static changePassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_model_1.User.findOne({ where: { email: data.email } });
                if (!user) {
                    return { status: 400, send: "There is no user with this email" };
                }
                else {
                    const valid = yield bcrypt_1.default.compare(data.oldPassword, user.password);
                    if (!valid) {
                        return { status: 400, send: "Old password is not correct" };
                    }
                    user.password = yield bcrypt_1.default.hash(data.newPassword, 10);
                    const res = yield user.save();
                    delete res.password;
                    return { status: 200, send: res };
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Update user
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
                throw e;
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
                throw e;
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=index.services.js.map