import {
    BaseEntity,
    Column, Entity, PrimaryGeneratedColumn
} from "typeorm";
import { COMMENT } from "../../config/tables";

@Entity(COMMENT)
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    public CommentId?: number;

    @Column()
    public Question: string;

    @Column()
    public Title: boolean;

    @Column()
    public Content: string;

    @Column()
    public Likes: boolean;

    @Column()
    public Dislikes: number;

    @Column()
    public User: string;
}
