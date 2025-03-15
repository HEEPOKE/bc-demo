import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService, PrismaService],
})
export class WalletsModule {}
