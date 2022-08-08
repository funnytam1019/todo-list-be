import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserGetDTO } from 'src/interfaces/user/dto/get-user.dto';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userRequest: UserGetDTO): Promise<any> {
    const user = await this.authService.validateUser(userRequest);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}