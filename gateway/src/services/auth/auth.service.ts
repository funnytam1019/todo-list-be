import { Body, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { UserGetDTO } from "src/interfaces/user/dto/get-user.dto";
import { IServiceUserGetResponse } from "src/interfaces/user/service-user-get-by-id-response.interface";

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  public async validateUser(
    @Body() userRequest: UserGetDTO
  ): Promise<any> {
    const userResponse: IServiceUserGetResponse = await firstValueFrom(
      this.userServiceClient.send('user_get', userRequest)
    );
    if(!userResponse.user && userResponse.user.password == userRequest.password)
    {
      return userResponse;
    }
    return null;
  }
}