import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerShema } from './schemas/cutomer.schema';
import { Sales, SalesShema } from './schemas/sales.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Customer.name, schema: CustomerShema},
      {name: Sales.name, schema: SalesShema}
    ])
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
