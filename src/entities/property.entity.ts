import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeature } from "./propertyFeature.entity";

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
}