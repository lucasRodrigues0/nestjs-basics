import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_property_type'})
export class PropertyType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string
}