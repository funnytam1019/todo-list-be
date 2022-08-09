import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { ConfigService } from 'src/services/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
@Module({
  imports: [PassportModule],
  providers: [
    AuthService,
    LocalStrategy,
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
      const userServiceOptions = configService.get('userService');
      return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    }   
  ],
})
export class AuthModule {}
