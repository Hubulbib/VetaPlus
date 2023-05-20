import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { Record } from './record.entity';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UpdateRecordDto } from './dtos/update-record.dto';
import { RecordTypeEnum } from './enums/recordType.enum';
import { PayTypeEnum } from '../visit/enums/payType.enum';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('summary')
  getSummary(@Query('type') type: RecordTypeEnum, @Query('payType') payType: PayTypeEnum):  Promise<number>{
    return this.financeService.sumIncome(payType, type)
  }

  @Get('profit')
  getProfit(): Promise<number> {
    return this.financeService.getProfit()
  }

  @Get('record')
  findRecordBetweenDate(@Query('type') type: string, @Query('dateFrom') dateFrom: string, @Query('dateUntil') dateUntil: string): Promise<Record[]> {
    return this.financeService.findRecordBetweenDate(type, dateFrom, dateUntil)
  }

  @Post('record')
  createRecord(@Body() createRecordDto: CreateRecordDto): Promise<void> {
    return this.financeService.createRecord(createRecordDto)
  }

  @Put('record/:id')
  updateRecord(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto): Promise<void> {
    return this.financeService.updateRecord(+id, updateRecordDto)
  }

  @Delete('record/:id')
  removeRecord(@Param('id') id: string): Promise<void> {
    return this.financeService.removeRecord(+id)
  }
}
