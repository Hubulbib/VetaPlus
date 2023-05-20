import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { Visit } from '../visit/visit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record, Visit])
  ],
  controllers: [FinanceController],
  providers: [FinanceService]
})
export class FinanceModule {}
