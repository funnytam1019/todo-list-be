import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env'
    }),

  ],
  controllers: [AppController],
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
