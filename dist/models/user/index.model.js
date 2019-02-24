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
const index_model_1 = require("../answer/index.model");
const index_model_2 = require("../question/index.model");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.OneToMany((type) => index_model_2.Question, (question) => question.user),
    __metadata("design:type", Array)
], User.prototype, "questions", void 0);
__decorate([
    typeorm_1.OneToMany((type) => index_model_1.Answer, (answer) => answer.user),
    __metadata("design:type", Array)
], User.prototype, "answers", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => index_model_1.Answer, (answer) => answer.upvoters),
    __metadata("design:type", Array)
], User.prototype, "upvotedAnswers", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => index_model_1.Answer, (answer) => answer.downvoters),
    __metadata("design:type", Array)
], User.prototype, "downvotedAnswers", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => index_model_2.Question, (question) => question.upvoters),
    __metadata("design:type", Array)
], User.prototype, "upvotedQuestions", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => index_model_2.Question, (question) => question.downvoters),
    __metadata("design:type", Array)
], User.prototype, "downvotedQuestions", void 0);
User = __decorate([
    typeorm_1.Entity(tables_1.USER),
    typeorm_1.Unique(["email"]),
    typeorm_1.Unique(["userName"])
], User);
exports.User = User;
//# sourceMappingURL=index.model.js.map