import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Register } from "./Register";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'text'})
    name: string;

    @Column({type: 'text'})
    email: string;

    @CreateDateColumn()
    create_at: Date;

    @OneToMany(() => Register, register => register.user, { cascade: true } )
    registers: Register[]
}