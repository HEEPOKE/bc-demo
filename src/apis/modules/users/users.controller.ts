import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationDto } from './../../../common/dto/pagination.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(@Query() pagination: PaginationDto) {
    return this.usersService.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
