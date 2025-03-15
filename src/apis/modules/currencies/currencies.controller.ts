import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  async getAllCurrencies() {
    return this.currenciesService.getAllCurrencies();
  }

  @Get(':id')
  async getCurrencyById(@Param('id') id: string) {
    return this.currenciesService.getCurrencyById(id);
  }

  @Post()
  async createCurrency(@Body() data: CreateCurrencyDto) {
    return this.currenciesService.createCurrency(data);
  }

  @Patch(':id')
  async updateCurrency(
    @Param('id') id: string,
    @Body() data: UpdateCurrencyDto,
  ) {
    return this.currenciesService.updateCurrency(id, data);
  }

  @Delete(':id')
  async deleteCurrency(@Param('id') id: string) {
    return this.currenciesService.deleteCurrency(id);
  }
}
