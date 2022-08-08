import { ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<TUser = any>(
    err: any, user: any, info: any,
    context: ExecutionContext, status?: any
    ): TUser {
      const request = context.switchToHttp().getRequest();
      const { email, password } = request.body;
      if(err || !user) {
        if(!email) {
          throw new HttpException({ message: 'no_user'}, HttpStatus.OK);
        } else if (!password) {
          throw new HttpException({ message: 'no_password'}, HttpStatus.OK);
        } else {
          throw err || new UnauthorizedException();
        }
      }
    return user;
  }
}