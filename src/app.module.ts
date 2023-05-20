import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientModule } from './client/client.module';
import { Client } from './client/client.entity';
import { PetModule } from './pet/pet.module';
import { VisitModule } from './visit/visit.module';
import { Pet } from './pet/pet.entity';
import { Visit } from './visit/visit.entity';
import { FinanceModule } from './finance/finance.module';
import { Record } from './finance/record.entity';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          synchronize: false,
          entities: [Client, Pet, Visit, Record]
      }),
      ClientModule,
      PetModule,
      VisitModule,
      FinanceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
