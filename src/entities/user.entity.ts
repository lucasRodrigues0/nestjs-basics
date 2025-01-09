import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity({name: 'tb_user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    email: string;
    @Column()
    avatarUrl: string;
    @CreateDateColumn()
    createdAt: Date;
    @OneToMany(() => Property, (property) => property.user)
    properties: Property[];
}