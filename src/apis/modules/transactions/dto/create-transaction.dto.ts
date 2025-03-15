import { IsUUID, IsNumber, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  walletId: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
