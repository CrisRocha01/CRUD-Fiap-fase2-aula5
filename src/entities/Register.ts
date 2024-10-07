import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("register")
export class Register {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamptz" })
    clock_in: Date;

    @Column({ type: "timestamptz" })
    clock_out: Date;

    @CreateDateColumn()
    create_at: Date;

    @ManyToOne(() => User, user => user.registers,  { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id" })
    user: User;
}
