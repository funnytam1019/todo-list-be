import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserResponseDTO } from './interfaces/user/dto/create-user-response.dto';
import { CreateUserDTO } from './interfaces/user/dto/create-user.dto';
import { IServiceUserCreateResponse } from './interfaces/user/service-user-create-response.interface';

@Controller('api')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}
  

  

  
  @Post('users')
  public async createUser(
    @Body() userRequest: CreateUserDTO
  ): Promise<CreateUserResponseDTO> {
    const createUserResponse: IServiceUserCreateResponse
      = await this.userServiceClient.emit('user_created', userRequest)
    
    return {
      message: createUserResponse.
    }
  };

}

