import {
    BaseEntity,
    Column, Entity, PrimaryGeneratedColumn, ManyToOne
} from "typeorm";
import { COMMENT } from "../../config/tables";
import { User } from "../user/index.model";
import { Question } from "../question/index.model";

@Entity(COMMENT)
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    public CommentId?: number;

    @ManyToOne(type => Question, question => question.Comments)
    public Question: Question;

    @Column()
    public Title: string;

    @Column()
    public Content: string;

    @Column()
    public Likes: number;

    @Column()
    public Dislikes: number;

    @ManyToOne(type => User, user => user.Comments)
    public User: User;
}
