import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './modules/prisma/prisma.service';
import { RedisService } from './../cache/redis.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CurrenciesModule } from './modules/currencies/currencies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    WalletsModule,
    TransactionsModule,
    CurrenciesModule,
  ],
  providers: [PrismaService, RedisService, RedisService],
})
export class ApisModule {}
