import { 
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject, 
  Param, 
  Post, 
  Put, 
  Req, 
  Request, 
  UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from './decorators/authorization.decorator';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { IServiveTokenCreateResponse } from './interfaces/token/service-token-create-response.interface';
import { IServiceTokenDestroyResponse } from './interfaces/token/service-token-destroy-response.interface';
import { CreateUserResponseDTO } from './interfaces/user/dto/create-user-response.dto';
import { CreateUserDTO } from './interfaces/user/dto/create-user.dto';
import { UserGetResponseDTO } from './interfaces/user/dto/get-user-response.dto';
import { UserGetDTO } from './interfaces/user/dto/get-user.dto';
import { LoginUserResponseDto } from './interfaces/user/dto/login-user-response.dto';
import { LoginUserDto } from './interfaces/user/dto/login-user.dto';
import { LogoutUserResponseDto } from './interfaces/user/dto/logout-user-response.dto';
import { IServiceUserCreateResponse } from './interfaces/user/service-user-create-response.interface';
import { IServiceUserGetResponse } from './interfaces/user/service-user-get-by-id-response.interface';
import { IServiceUserSearchResponse } from './interfaces/user/service-user-search-response.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}
  
  @Get()
  @Authorization(true)
  public async getUserByToken(
    @Body() userRequest: UserGetDTO
  ): Promise<UserGetResponseDTO> {
    const userResponse: IServiceUserGetResponse =
      await firstValueFrom(
        this.userServiceClient.send('user_get', userRequest)
      );
      return {
        message: userResponse.message,
        data: {
          user: userResponse.user,
        },
        errors: null
      }
  }

  @Post()
  public async createUser(
    @Body() userRequest: CreateUserDTO
    ): Promise<CreateUserResponseDTO> {
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

    const createTokenResponse: IServiveTokenCreateResponse = await firstValueFrom(
      this.tokenServiceClient.send('token_create', {
        userId: createUserResponse.user.id
      }),
    );

    return {
      message: createUserResponse.message,
      data: {
        user: createUserResponse.user,
        token: createTokenResponse.token,
      },
      errors: null
    }
  }

  @Post('/login')
  public async loginUser(
    @Body() loginRequest: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    const getUserResponse: IServiceUserSearchResponse = await firstValueFrom(
      this.userServiceClient.send('user_search_by_credentials', loginRequest),
    );

    if (getUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getUserResponse.message,
          data: null,
          errors: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const createTokenResponse: IServiveTokenCreateResponse = await firstValueFrom(
      this.tokenServiceClient.send('token_create', {
        userId: getUserResponse.user.id,
      }),
    );

    return {
      message: createTokenResponse.message,
      data: {
        token: createTokenResponse.token,
      },
      errors: null,
    };
  }

  @Put('/logout')
  @Authorization(true)
  public async logoutUser(
    @Req() request: IAuthorizedRequest,
  ): Promise<LogoutUserResponseDto> {
    const userInfo = request.user;

    const destroyTokenResponse: IServiceTokenDestroyResponse = await firstValueFrom(
      this.tokenServiceClient.send('token_destroy', {
        userId: userInfo.id,
      }),
    );

    if (destroyTokenResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: destroyTokenResponse.message,
          data: null,
          errors: destroyTokenResponse.errors,
        },
        destroyTokenResponse.status,
      );
    }

    return {
      message: destroyTokenResponse.message,
      errors: null,
      data: null,
    };
  }
}
