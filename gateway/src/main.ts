import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './services/config/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = new ConfigService().get('port');
  await app.listen(port).then(() => {
    console.log('Api gateway is ready for connection', port);
  });
}
bootstrap();