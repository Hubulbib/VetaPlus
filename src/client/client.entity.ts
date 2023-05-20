import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Pet } from "../pet/pet.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    name: string

    @Column({length: 30})
    phone: string

    @OneToMany(() => Pet, (pet) => pet.client)
    pets: Pet[]
}