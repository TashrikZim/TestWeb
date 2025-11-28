import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { UserEntity } from './customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
