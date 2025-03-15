import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;
}
