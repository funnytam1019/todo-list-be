import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import mongoose from 'mongoose';
import { IUserCreateResponse } from './interfaces/user-create-response.interface';
import { IUserSearchResponse } from './interfaces/user-search-response.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './services/user.service';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user_get')
  public async getUser(params: { email: string }): Promise<IUserSearchResponse> 
  {
    let result: IUserSearchResponse = <any>{};

    const user = await this.userService.searchUser(params);
    result.status = user[0] ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    result.message = user[0] ? 'user_get_success' : 'user_get_not_found';
    result.user = user[0] ? user[0] : null;
    return result;
  }

  @MessagePattern('user_get_by_id')
  public async getUserById(id : any): Promise<IUserSearchResponse> {
    let result: IUserSearchResponse = <any>{};
    let userId = id.replace(/[:]+/g, '');

    if(userId) {
      const user = mongoose.isValidObjectId(userId) ?
                    await this.userService.searchUserById(userId) :
                    null;
      result.status = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      result.message = user ? 'user_get_by_id_success' :
                              'user_get_by_id_not_found';
      result.user = user;
    } else {
        result.status = HttpStatus.BAD_REQUEST;
        result.message = 'user_get_by_id_bad_request';
        result.user = null;
    }
    return result;
  }

  @MessagePattern('user_create')
  public async createUser(userParams: IUser): Promise<IUserCreateResponse> {
    let result: IUserCreateResponse = <any>{};

    if(!userParams) {
      result.status = HttpStatus.BAD_REQUEST;
      result.message = 'user_create_bad_request';
      result.user = null;
      result.errors = null;
    } else {
       const userWithEmail = await this.userService.searchUser({
          email: userParams.email
        });
  
        if(userWithEmail && userWithEmail.length > 0 ) {
          result.status = HttpStatus.CONFLICT;
          result.message = 'user_create_conflict';
          result.user = null;
          result.errors.email = {
            message: 'Email already exists',
            path: 'email'
          };
        } else {
          try {
          const user = await this.userService.createUser(userParams);
          result.status = HttpStatus.CREATED;
          result.message = 'user_create_success';
          result.user = user;
          result.errors = null;
        } catch(e) {
          result.status = HttpStatus.PRECONDITION_FAILED;
          result.message = 'user_create_precondition_failed';
          result.user = null;
          result.errors = e.errors;
        }
        } 
    }
    return result;
  }
}
