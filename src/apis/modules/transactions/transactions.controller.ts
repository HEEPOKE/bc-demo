import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../../../common/guards/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('buy')
  async buyCrypto(@Body() data: CreateTransactionDto) {
    return this.transactionsService.createTransaction(
      data.walletId,
      data.amount,
      'BUY',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('sell')
  async sellCrypto(@Body() data: CreateTransactionDto) {
    return this.transactionsService.createTransaction(
      data.walletId,
      data.amount,
      'SELL',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  async transferFunds(@Body() transferDto: TransferDto) {
    return this.transactionsService.transferFunds(transferDto);
  }
}
