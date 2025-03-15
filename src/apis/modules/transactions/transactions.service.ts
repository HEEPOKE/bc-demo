import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from './../../../cache/redis.service';
import { PrismaService } from '../prisma/prisma.service';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async createTransaction(walletId: string, amount: number, type: string) {
    const transaction = await this.prisma.transaction.create({
      data: { walletId, amount, type, price: 50000.0 },
    });

    await this.redisService.setCache(
      `transaction:${transaction.id}`,
      transaction,
    );

    return transaction;
  }

  async getTransaction(transactionId: string) {
    const cached = await this.redisService.getCache(
      `transaction:${transactionId}`,
    );
    if (cached) return cached;

    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (transaction) {
      await this.redisService.setCache(
        `transaction:${transactionId}`,
        transaction,
      );
    }

    return transaction;
  }

  async transferFunds(dto: TransferDto) {
    const { fromWalletId, toWalletId, amount } = dto;

    const fromWallet = await this.prisma.wallet.findUnique({
      where: { id: fromWalletId },
    });
    const toWallet = await this.prisma.wallet.findUnique({
      where: { id: toWalletId },
    });

    if (!fromWallet || !toWallet) {
      throw new BadRequestException('Invalid wallet ID');
    }

    if (fromWallet.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    await this.prisma.wallet.update({
      where: { id: fromWalletId },
      data: { balance: fromWallet.balance - amount },
    });

    await this.prisma.wallet.update({
      where: { id: toWalletId },
      data: { balance: toWallet.balance + amount },
    });

    const transaction = await this.prisma.transaction.create({
      data: {
        walletId: fromWalletId,
        amount,
        type: 'TRANSFER',
      },
    });

    await this.redisService.deleteCache(`wallet:${fromWalletId}`);
    await this.redisService.deleteCache(`wallet:${toWalletId}`);

    return transaction;
  }
}
