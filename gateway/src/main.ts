import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.setGlobalPrefix('api'); //adding prefix before the http call
   await app.listen(8000);





   // const app = await NestFactory.create(AppModule);
   // const options = new DocumentBuilder()
   //    .setTitle('Testing swagger docs')
   //    .addTag('users')
   //    .addTag('todo')
   //    .setVersion('1.0')
   //    .build();
   // const document = SwaggerModule.createDocument(app, options);
   // SwaggerModule.setup('api', app, document);
   // await app.listen(new ConfigService().get('port'));
}
bootstrap();
