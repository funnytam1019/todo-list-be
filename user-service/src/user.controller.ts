import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { IUserCreateResponse } from './interfaces/user-create-response.interface';
import { IUserSearchResponse } from './interfaces/user-search-response.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user_get_by_id')
  public async getUserById(id: string): Promise<IUserSearchResponse> {
    let result: IUserSearchResponse;
    // if(id) {
    //   const user = await this.userService.searchUserById(id);
    //   if(user) {
    //     result = {
    //       status: HttpStatus.OK,
    //       message: 'user_get_by_id_success',
    //       user,
    //     };
    //   } else {
    //     result = {
    //       status: HttpStatus.NOT_FOUND,
    //       message: 'user_get_by_id_not_found',
    //       user,
    //     }
    //   }
    // } else {
    //   result = {
    //     status: HttpStatus.BAD_REQUEST,
    //     message: 'user_get_by_id_bad_request',
    //     user: null,
    //   }
    // }
    result = {
      status: HttpStatus.OK,
      message: 'user_get_by_id_success',
      user: null
    }
    return result;
  }
}
