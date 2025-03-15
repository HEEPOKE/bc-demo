import { Injectable } from '@nestjs/common';
import { RedisService } from './../../../cache/redis.service';
import { PrismaService } from './../prisma/prisma.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrenciesService {
  private readonly cacheKey = 'currencies:all';

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async getAllCurrencies() {
    const cachedData = await this.redisService.getCache(this.cacheKey);
    if (cachedData) return cachedData;

    const currencies = await this.prisma.currencies.findMany();

    await this.redisService.setCache(
      this.cacheKey,
      JSON.stringify(currencies),
      3600,
    );

    return currencies;
  }

  async getCurrencyById(id: string) {
    const currency = await this.prisma.currencies.findUnique({ where: { id } });
    return currency;
  }

  async createCurrency(data: CreateCurrencyDto) {
    const newCurrency = await this.prisma.currencies.create({ data });

    await this.redisService.deleteCache(this.cacheKey);

    return newCurrency;
  }

  async updateCurrency(id: string, data: UpdateCurrencyDto) {
    const updatedCurrency = await this.prisma.currencies.update({
      where: { id },
      data,
    });

    await this.redisService.deleteCache(this.cacheKey);

    return updatedCurrency;
  }

  async deleteCurrency(id: string) {
    await this.prisma.currencies.delete({ where: { id } });

    await this.redisService.deleteCache(this.cacheKey);
  }
}
