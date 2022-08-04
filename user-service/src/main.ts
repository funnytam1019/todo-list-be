import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: new ConfigService().get('port'),
      },
    } as TcpOptions);
    let a = new ConfigService().get('port')
  app.listen().then(() => { console.log('User microservice is listening', a)});
}
bootstrap();
