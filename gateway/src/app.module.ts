import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
   ClientsModule.register([
      {
         name: 'TODO_SERVICE',
         transport: Transport.TCP,
         options: {
            host: '127.0.0.1',
            port: 8001,
         },
      },
      {
         name: 'USER_SERVICE',
         transport: Transport.TCP,
         opstions: {
            host: '127.0.0.1',
            port: 8002,
         },
      },
   ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
