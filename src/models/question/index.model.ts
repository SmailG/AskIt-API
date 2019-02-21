import {
    BaseEntity,
    Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import { QUESTION } from "../../config/tables";
import { Comment } from "../comment/index.model";
import { User } from "../user/index.model";

@Entity(QUESTION)
export class Question extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    public questionId?: number;

    @OneToMany((type) => Comment, (comment) => comment.question)
    public comments: Comment[];

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
