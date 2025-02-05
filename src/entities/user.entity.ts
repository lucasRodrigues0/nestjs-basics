import { BeforeInsert, Column, CreateDateColumn, Entity, IsNull, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/enums/role.enum";

@Entity({ name: 'tb_user' })
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
    password: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({
        nullable: true
    })
    hashedRefreshToken: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @OneToMany(() => Property, (property) => property.user)
    properties: Property[];

    @ManyToMany(() => Property, (property) => property.likedBy)
    @JoinTable({ name: 'tb_user_liked_properties' })
    likedProperties: Property[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

}