import { PayTypeEnum } from '../enums/payType.enum';

export class UpdateVisitDto {
  disease?: string
  treatment?: string
  payType?: PayTypeEnum
  paySum?: number
}