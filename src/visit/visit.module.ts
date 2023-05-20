import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit])
  ],
  providers: [VisitService],
  controllers: [VisitController],
  exports: [VisitModule]
})
export class VisitModule {}
