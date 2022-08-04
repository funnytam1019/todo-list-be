import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { ConfigService } from './services/config/config.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env'
    }),
  ],
  controllers: [UsersController],
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
