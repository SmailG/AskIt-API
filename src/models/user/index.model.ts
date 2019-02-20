import {
    BaseEntity,
    Column, Entity, PrimaryGeneratedColumn, OneToMany
} from "typeorm";
import { Question } from '../question/index.model';
import { Comment } from '../comment/index.model';
import { USER } from "../../config/tables";

@Entity(USER)
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    public UserID?: number;

    @Column()
    public Username: string;

    @Column()
    public Password: string;

    @Column()
    public Email: string;

    @OneToMany(type => Question, question => question.User)
    public Questions: Question[];

    @OneToMany(type => Comment, comment => comment.User)
    public Comments: Comment[];
}
