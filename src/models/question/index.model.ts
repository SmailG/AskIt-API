import {
    BaseEntity,
    Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
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

    @Column()
    public likes: number;

    @Column()
    public dislikes: number;

    @ManyToOne((type) => User, (user) => user.questions )
    public user: User;
}
