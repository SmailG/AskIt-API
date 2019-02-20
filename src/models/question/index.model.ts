import {
    BaseEntity,
    Column, Entity, PrimaryGeneratedColumn
} from "typeorm";
import { QUESTION } from "../../config/tables";

@Entity(QUESTION)
export class Question extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    public QuestionId?: number;

    @Column()
    public Comments: string;

    @Column()
    public Title: boolean;

    @Column()
    public Content: string;

    @Column()
    public Likes: boolean;

    @Column()
    public Dislikes: number;

    @Column()
    public User: number;
}
