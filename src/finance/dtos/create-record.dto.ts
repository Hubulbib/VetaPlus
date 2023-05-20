import { PayTypeEnum } from '../../visit/enums/payType.enum';
import { RecordTypeEnum } from '../enums/recordType.enum';

export class CreateRecordDto {
  date: Date
  type: RecordTypeEnum
  text: string
  paySum: number
  payType: PayTypeEnum
}