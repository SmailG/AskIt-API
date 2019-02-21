import {
    BaseEntity,
    Column, Entity, OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import { USER } from "../../config/tables";
import { Comment } from "../comment/index.model";
import { Question } from "../question/index.model";

@Entity(USER)
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    public userId?: number;

    @Column()
    public userName: string;

    @Column()
    public password: string;

    @Column()
    public email: string;

    @OneToMany((type) => Question, (question) => question.user)
    public questions: Question[];

    @OneToMany((type) => Comment, (comment) => comment.user)
    public comments: Comment[];
}
