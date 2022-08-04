import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { IUserCreateResponse } from './interfaces/user-create-response.interface';
import { IUserSearchResponse } from './interfaces/user-search-response.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({cmd: 'get_users'})
  getUsers() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
    return null;
  }
  
}
