import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TodoModule } from './todo.module';

async function bootstrap() {
   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      TodoModule,
      {
        transport: Transport.TCP,
        options: {
         host: '127.0.0.1',
         port: 3001
        }
      },
    );
    app.listen().then(() => {console.log('User microservice is listening')});
}
bootstrap();
