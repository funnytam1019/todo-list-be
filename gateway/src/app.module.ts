import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UsersController } from './user.controller';
import { ConfigService } from './services/config/config.service';
// import { AUthController } from './auth.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env'
    }),
    JwtModule.register({
      secret: new ConfigService().get('jwtKey'),
      signOptions: { expiresIn: "60s"},
    }),
    PassportModule
  ],
  controllers: [
    UsersController,
    AuthController
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
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
export class AppModule {}