import {
    BaseEntity,
    Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import { QUESTION } from "../../config/tables";
import { Answer } from "../answer/index.model";
import { User } from "../user/index.model";

@Entity(QUESTION)
export class Question extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    public questionId?: number;

    @OneToMany((type) => Answer, (answer) => answer.question)
    public answers: Answer[];

    @Column()
    public title: string;

    @Column()
    public content: string;

    @ManyToMany((type) => User, (user) => user.upvotedQuestions, { eager: true })
    @JoinTable()
    public upvoters: User[];

    @ManyToMany((type) => User, (user) => user.downvotedQuestions, { eager: true })
    @JoinTable()
    public downvoters: User[];

    @ManyToOne((type) => User, (user) => user.questions )
    public user: User;
}
