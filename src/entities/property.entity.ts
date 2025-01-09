import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeature } from "./propertyFeature.entity";
import { User } from "./user.entity";

@Entity({ name: "tb_property" })
export class Property {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ default: 0 })
    price: number;

    @OneToOne(
        () => PropertyFeature,
        (PropertyFeature) => PropertyFeature.property,
        { cascade: true }
    )
    propertyFeature: PropertyFeature;

    @ManyToOne(() => User, (user) => user.properties)
    @JoinColumn({name: 'ownerId'})
    user: User;
}