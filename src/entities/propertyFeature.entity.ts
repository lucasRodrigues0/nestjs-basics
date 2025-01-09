import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity({name: "tb_property_feature"})
export class PropertyFeature {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    bedrooms: number;
    @Column()
    bathrooms: number;
    @Column()
    parkingSpots: number;
    @Column()
    area: number;
    @Column()
    hasSwimmingPool: boolean;
    @Column()
    hasGardenYard: boolean;
    @Column()
    hasBalcony: boolean;
    @OneToOne(() => Property)
    @JoinColumn()
    property: Property;
}