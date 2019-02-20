import {
    BaseEntity,
    Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany
} from "typeorm";
import { QUESTION } from "../../config/tables";
import { Comment } from "../comment/index.model";
import { User } from "../user/index.model";

@Entity(QUESTION)
export class Question extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    public QuestionId?: number;

    @OneToMany(type => Comment, comment => comment.Question)
    public Comments: Comment[];

    @Column()
    public Title: string;

    @Column()
    public Content: string;

    @Column()
    public Likes: number;

    @Column()
    public Dislikes: number;

    @ManyToOne(type => User, user => user.Questions )
    public User: User;
}
