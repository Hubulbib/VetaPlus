import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UpdateRecordDto } from './dtos/update-record.dto';
import { RecordTypeEnum } from './enums/recordType.enum';
import { PayTypeEnum } from '../visit/enums/payType.enum';
import { Visit } from '../visit/visit.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Record) private readonly recordRepository: Repository<Record>,
    @InjectRepository(Visit) private readonly visitRepository: Repository<Visit>
  ) {}

  sumIncome = async (payType: PayTypeEnum, type: RecordTypeEnum = RecordTypeEnum.income): Promise<number> => {
    const recordIncome = await this.recordRepository
      .createQueryBuilder('record')
      .select('SUM("paySum")', 'sum')
      .where('type = :type', {type})
      .andWhere('"payType" = :payType', {payType})
      .getRawOne()

    const visitIncome = await this.visitRepository
      .createQueryBuilder('visit')
      .select('SUM("paySum")', 'sum')
      .where('"payType" = :payType', {payType})
      .getRawOne()

    return (+recordIncome.sum) + (+visitIncome.sum)
  }

  getProfit = async(): Promise<number> => {
    const recordIncome = await this.recordRepository
      .createQueryBuilder('record')
      .select('SUM("paySum")', 'sum')
      .where('type = :type', {type: 'income'})
      .getRawOne()

    const visitIncome = await this.visitRepository
      .createQueryBuilder('visit')
      .select('SUM("paySum")', 'sum')
      .getRawOne()

    const recordExpense = await this.recordRepository
      .createQueryBuilder('record')
      .select('SUM("paySum")', 'sum')
      .where('type = :type', {type: 'expense'})
      .getRawOne()

    const balance = (+recordIncome.sum) + (+visitIncome.sum) - (+recordExpense.sum)

    return balance < 0 ? 0 : balance
  }

  findRecordBetweenDate = (type: string, dateFrom: string, dateUntil: string): Promise<Record[]> => {
    return this.recordRepository
      .createQueryBuilder('record')
      .where(
        'type = :type', {type}
      )
      .andWhere(
        'date >= :dateFrom', { dateFrom }
      )
      .andWhere(
        'date <= :dateUntil', { dateUntil }
      )
      .getMany()
  }

  createRecord = async(createRecordDto: CreateRecordDto): Promise<void> => {
    await this.recordRepository
      .createQueryBuilder('record')
      .insert()
      .values([{...createRecordDto}])
      .execute()
  }

  updateRecord = async(id: number, updateRecordDto: UpdateRecordDto): Promise<void> => {
    await this.recordRepository
      .createQueryBuilder('record')
      .update()
      .set({...updateRecordDto})
      .where('id = :id', {id})
      .execute()
  }

  removeRecord = async(id: number): Promise<void> => {
    await this.recordRepository.delete(id)
  }
}
