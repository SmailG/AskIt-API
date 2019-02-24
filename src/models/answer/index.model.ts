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

    @ManyToOne((type) => Question, (question) => question.answers, { nullable: false })
    public question: Question;

    @Column({ length: "200" })
    public content: string;

    @ManyToMany((type) => User, (user) => user.upvotedAnswers)
    @JoinTable()
    public upvoters?: User[];

    @ManyToMany((type) => User, (user) => user.downvotedAnswers)
    @JoinTable()
    public downvoters?: User[];

    @ManyToOne((type) => User, (user) => user.answers, { nullable: false })
    public user: User;
}
