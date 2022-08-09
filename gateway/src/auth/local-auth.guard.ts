import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//setting the AuthGuard to call to local.strategy
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}