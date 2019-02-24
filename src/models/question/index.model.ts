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
    public answers?: Answer[];

    @Column({ length: "80" })
    public content: string;

    @ManyToMany((type) => User, (user) => user.upvotedQuestions)
    @JoinTable()
    public upvoters?: User[];

    @ManyToMany((type) => User, (user) => user.downvotedQuestions)
    @JoinTable()
    public downvoters?: User[];

    @ManyToOne((type) => User, (user) => user.questions, { nullable: false } )
    public user: User;
}
