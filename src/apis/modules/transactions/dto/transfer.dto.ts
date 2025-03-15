import { IsUUID, IsNumber, IsPositive } from 'class-validator';

export class TransferDto {
  @IsUUID()
  fromWalletId: string;

  @IsUUID()
  toWalletId: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
