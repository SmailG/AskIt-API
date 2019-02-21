import {
    BaseEntity,
    Column, Entity, ManyToOne, PrimaryGeneratedColumn
} from "typeorm";
import { COMMENT } from "../../config/tables";
import { Question } from "../question/index.model";
import { User } from "../user/index.model";

@Entity(COMMENT)
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    public commentId?: number;

    @ManyToOne((type) => Question, (question) => question.comments)
    public question: Question;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @Column()
    public likes: number;

    @Column()
    public dislikes: number;

    @ManyToOne((type) => User, (user) => user.comments)
    public user: User;
}
