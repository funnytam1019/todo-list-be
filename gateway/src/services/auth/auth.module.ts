import { Module } from "@nestjs/common";
import { ClientProxyFactory } from "@nestjs/microservices";
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from "../config/config.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    PassportModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    ConfigService,
    LocalStrategy,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
      const userServiceOptions = configService.get('userService');
      return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [ConfigService],
    }
  ]
})
export class AuthModule {}