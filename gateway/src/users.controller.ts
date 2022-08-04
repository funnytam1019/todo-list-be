import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { GetUserByIdResponseDTO } from './interfaces/user/dto/get-user-by-id-response.dto';
import { IServiceUserGetByIdResponse } from './interfaces/user/service-user-get-by-id-response.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  @Get()
  getUsers() {
    return this.userServiceClient.send({cmd: 'get_users'}, {});
  }
}


