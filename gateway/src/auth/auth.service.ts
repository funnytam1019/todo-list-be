import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
    ) {}

  async validateUser(email: string, password: string)): Promise<any> {
    const user = await this.userServiceClient.send('user_get', params)
    if(user && user.password === )
  }
}