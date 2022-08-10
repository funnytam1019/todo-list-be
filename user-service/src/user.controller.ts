import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import mongoose from 'mongoose';
import { IUserCreateResponse } from './interfaces/user-create-response.interface';
import { IUserSearchResponse } from './interfaces/user-search-response.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
  * This is the route handler for 'user_search_by_credentials' message
  * @MessagePattern Message `"user_search_by_credentials"`
  * @param {object} params Object contains email and password of the user
  * @returns {object} Returns object with type `IUserSearchResponse`
  */
  @MessagePattern('user_search_by_credentials')
  public async getUser(params: {
    email: string;
    password: string;
  }): Promise<IUserSearchResponse> {
    let result: IUserSearchResponse = <any>{};

    //check if the params is empty
    if (params.email && params.password) {
      const user = await this.userService.searchUser({
        email: params.email
      });

      //if the user has been found in the database, we will
      //compare the password that was stored in the database and the
      //user input
      if (user && user[0]) {
        const passCheck = await user[0].compareEncryptedPassword(params.password)
        result.status = passCheck ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        result.message = passCheck ? 'user_search_by_credentials_success' :
          'user_search_by_credentials_not_match';
        result.user = passCheck ? user[0] : null
      //else the user has not been found return NOT_FOUND
      } else {
        result.status = HttpStatus.NOT_FOUND;
        result.message = 'user_search_by_credentials_not_found'
        result.user = null;
      }
      //if the user send an empty params we will return NOT_FOUND
    } else {
      result.status = HttpStatus.NOT_FOUND;
      result.message = 'user_search_by_credentials_not_found';
      result.user = null;
    }

    return result;
  }

  @MessagePattern('user_get_by_id')
  public async getUserById(id: any): Promise<IUserSearchResponse> {
    let result: IUserSearchResponse = <any>{};
    let userId = id.replace(/[:]+/g, '');

    if (userId) {
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

  /**
  * This is the route handler for 'user_create' message
  * @MessagePattern Message `"user_create"`
  * @param {object} userParams Object with type `IUser`
  * @returns {object} Returns object with type `IUserCreateResponse`
  */
  @MessagePattern('user_create')
  public async createUser(userParams: IUser): Promise<IUserCreateResponse> {
    let result: IUserCreateResponse = <any>{};

    if (!userParams) {
      result.status = HttpStatus.BAD_REQUEST;
      result.message = 'user_create_bad_request';
      result.user = null;
      result.errors = null;
    } else {
      const userWithEmail = await this.userService.searchUser({
        email: userParams.email
      });

      if (userWithEmail && userWithEmail.length > 0) {
        result.status = HttpStatus.CONFLICT;
        result.message = 'user_create_conflict';
        result.user = null;
        result.errors = {
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
        } catch (e) {
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
