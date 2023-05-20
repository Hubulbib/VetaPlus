import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PayTypeEnum } from "./enums/payType.enum";
import { Pet } from "../pet/pet.entity";

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: Date

  @Column()
  disease: string

  @Column()
  treatment: string

  @Column({nullable: false})
  payType: PayTypeEnum

  @Column()
  paySum: number

  @ManyToOne(() => Pet, (pet) => pet.visits)
  pet: Pet
}