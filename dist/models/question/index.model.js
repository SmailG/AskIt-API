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
const index_model_2 = require("../user/index.model");
let Question = class Question extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], Question.prototype, "questionId", void 0);
__decorate([
    typeorm_1.OneToMany((type) => index_model_1.Answer, (answer) => answer.question),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Question.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => index_model_2.User, (user) => user.upvotedQuestions, { eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Question.prototype, "upvoters", void 0);
__decorate([
    typeorm_1.ManyToMany((type) => index_model_2.User, (user) => user.downvotedQuestions, { eager: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Question.prototype, "downvoters", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => index_model_2.User, (user) => user.questions),
    __metadata("design:type", index_model_2.User)
], Question.prototype, "user", void 0);
Question = __decorate([
    typeorm_1.Entity(tables_1.QUESTION)
], Question);
exports.Question = Question;
//# sourceMappingURL=index.model.js.map