import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number) {
    return this.prisma.users.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findById(id: string) {
    return this.prisma.users.findUnique({ where: { id } });
  }
}
