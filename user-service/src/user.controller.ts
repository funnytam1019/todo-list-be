import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { IUserCreateResponse } from './interfaces/user-create-response.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('user_created')
  public async createUser(userParams: IUser): Promise<IUserCreateResponse> {
    let result: IUserCreateResponse;
    if(userParams) {
      result = {
        status: HttpStatus.CREATED,
        message: 'user_create_success',
        user: userParams,
        errors: null
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_create_bad_request',
        user: null,
        errors: null,
      };
    }
    return result
  }
}
