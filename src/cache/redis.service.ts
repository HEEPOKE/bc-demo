import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      db: this.configService.get<number>('REDIS_DB', 0),
    });

    this.client.on('connect', () => console.log('Connected to Redis'));
    this.client.on('error', (err) => console.error('Redis Error:', err));
  }

  async onModuleInit() {
    console.log('RedisService Initialized');
  }

  async onModuleDestroy() {
    await this.client.quit();
    console.log('RedisService Disconnected');
  }

  async setCache(key: string, value: string, ttl = 3600) {
    await this.client.set(key, value, 'EX', ttl);
  }

  async getCache<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async deleteCache(key: string) {
    await this.client.del(key);
  }
}
