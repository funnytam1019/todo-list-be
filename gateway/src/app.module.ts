import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { UsersController } from './user.controller';
import { ConfigService } from './services/config/config.service';
// import { AUthController } from './auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env'
    }),
    AuthModule
  ],
  controllers: [
    UsersController,
    AuthController
  ],
  providers: [
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