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
let Comment = class Comment extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], Comment.prototype, "commentId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => index_model_1.Question, (question) => question.comments),
    __metadata("design:type", index_model_1.Question)
], Comment.prototype, "question", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Comment.prototype, "likes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Comment.prototype, "dislikes", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => index_model_2.User, (user) => user.comments),
    __metadata("design:type", index_model_2.User)
], Comment.prototype, "user", void 0);
Comment = __decorate([
    typeorm_1.Entity(tables_1.COMMENT)
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=index.model.js.map