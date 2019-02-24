import {
    BaseEntity,
    Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique
} from "typeorm";
import { USER } from "../../config/tables";
import { Answer } from "../answer/index.model";
import { Question } from "../question/index.model";

@Entity(USER)
@Unique(["email"])
@Unique(["userName"])
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
    public questions?: Question[];

    @OneToMany((type) => Answer, (answer) => answer.user)
    public answers?: Answer[];

    @ManyToMany((type) => Answer, (answer) => answer.upvoters)
    public upvotedAnswers?: Answer[];

    @ManyToMany((type) => Answer, (answer) => answer.downvoters)
    public downvotedAnswers?: Answer[];

    @ManyToMany((type) => Question, (question) => question.upvoters)
    public upvotedQuestions?: Question[];

    @ManyToMany((type) => Question, (question) => question.downvoters)
    public downvotedQuestions?: Question[];

}
