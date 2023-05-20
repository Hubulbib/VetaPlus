import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { GenderEnum } from "./enums/gender.enum";
import { Client } from "../client/client.entity";
import { Visit } from "../visit/visit.entity";

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number

  @Column({length: 100})
  name: string

  @Column({length: 100, nullable: true})
  nickname: string

  @Column({nullable: true})
  gender: GenderEnum

  @Column({nullable: true})
  age: Date

  @ManyToOne(() => Client, (client) => client.pets)
  client: Client

  @OneToMany(() => Visit, (visit) => visit.pet)
  visits: Visit[]
}