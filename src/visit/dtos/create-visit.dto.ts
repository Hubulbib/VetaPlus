import { PayTypeEnum } from '../enums/payType.enum';

export class CreateVisitDto {
  date: Date
  disease: string
  treatment: string
  payType: PayTypeEnum
  paySum: number
}