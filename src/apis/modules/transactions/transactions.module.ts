import { Module } from '@nestjs/common';
import { RedisService } from './../../../cache/redis.service';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, RedisService],
})
export class TransactionsModule {}
