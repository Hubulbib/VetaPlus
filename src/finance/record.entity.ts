import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PayTypeEnum } from '../visit/enums/payType.enum';
import { RecordTypeEnum } from './enums/recordType.enum';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: RecordTypeEnum

  @Column()
  date: Date

  @Column()
  text: string

  @Column()
  paySum: number

  @Column()
  payType: PayTypeEnum
}