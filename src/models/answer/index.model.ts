import {
    BaseEntity,
    Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn
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

    @ManyToMany((type) => User, (user) => user.upvotedAnswers, { eager: true })
    @JoinTable()
    public upvoters: User[];

    @ManyToMany((type) => User, (user) => user.downvotedAnswers, { eager: true })
    @JoinTable()
    public downvoters: User[];

    @ManyToOne((type) => User, (user) => user.answers)
    public user: User;
}
