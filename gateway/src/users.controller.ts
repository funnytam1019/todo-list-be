import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserResponseDTO } from './interfaces/user/dto/create-user-response.dto';
import { CreateUserDTO } from './interfaces/user/dto/create-user.dto';
import { GetUserByIdResponseDTO } from './interfaces/user/dto/get-user-by-id-response.dto';
import { IServiceUserCreateResponse } from './interfaces/user/service-user-create-response.interface';
import { IServiceUserGetByIdResponse } from './interfaces/user/service-user-get-by-id-response.interface';
import { IUser } from './interfaces/user/user.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  @Get()
  public async getUser() {
    return this.userServiceClient.send('get_users', {});
  }

  @Get(':id')
  public async getUserById(
    @Param('id') id: any
  ): Promise<GetUserByIdResponseDTO> {
    const userResponse: IServiceUserGetByIdResponse = 
      await firstValueFrom(
        this.userServiceClient.send('user_get_by_id', id)
      );
    
      return {
        message: userResponse.message,
        data: {
          user: userResponse.user,
        },
        errors: null,
      }
  }

  @Post()
  public async createUser(@Body() userRequest: CreateUserDTO): Promise<CreateUserResponseDTO> {
    const createUserResponse: IServiceUserCreateResponse = await firstValueFrom(
      this.userServiceClient.send('user_create', userRequest)
    );
    if(createUserResponse.status !== HttpStatus.CREATED) {
      throw new HttpException({
        message: createUserResponse.message,
        data: null,
        errors: createUserResponse.errors
      },
      createUserResponse.status,
      );
    }
    return {
      message: createUserResponse.message,
      data: {
        user: createUserResponse.user,
      },
      errors: null
    }
  }
}


