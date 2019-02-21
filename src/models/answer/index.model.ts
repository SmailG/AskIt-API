import {
    BaseEntity,
    Column, Entity, ManyToOne, PrimaryGeneratedColumn
} from "typeorm";
import { ANSWER } from "../../config/tables";
import { Question } from "../question/index.model";
import { User } from "../user/index.model";

@Entity(ANSWER)
export class Answer extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    public answerId?: number;

    @ManyToOne((type) => Question, (question) => question.answers)
    public question: Question;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @Column()
    public likes: number;

    @Column()
    public dislikes: number;

    @ManyToOne((type) => User, (user) => user.answers)
    public user: User;
}
