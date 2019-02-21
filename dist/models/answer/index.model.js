"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const tables_1 = require("../../config/tables");
const index_model_1 = require("../question/index.model");
const index_model_2 = require("../user/index.model");
let Answer = class Answer extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], Answer.prototype, "answerId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => index_model_1.Question, (question) => question.answers),
    __metadata("design:type", index_model_1.Question)
], Answer.prototype, "question", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Answer.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Answer.prototype, "content", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Answer.prototype, "likes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Answer.prototype, "dislikes", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => index_model_2.User, (user) => user.answers),
    __metadata("design:type", index_model_2.User)
], Answer.prototype, "user", void 0);
Answer = __decorate([
    typeorm_1.Entity(tables_1.ANSWER)
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=index.model.js.map