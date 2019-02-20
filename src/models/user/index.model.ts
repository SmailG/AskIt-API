import {
    BaseEntity,
    Column, Entity, PrimaryGeneratedColumn
} from "typeorm";
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

    @Column()
    public Quesions: boolean;

    @Column()
    public Comments: number;
}
