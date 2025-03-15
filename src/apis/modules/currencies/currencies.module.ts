import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from './../../../cache/redis.service';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, PrismaService, RedisService],
})
export class CurrenciesModule {}
