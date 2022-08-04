import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TODO_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001
        }
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002
        }
      }
    ]),
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
      }
    
    
    
    
  ],
})
export class AppModule { }
