import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
   imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/nest_user', {
         autoCreate: true
      }),
      UserModule
   ],
})
export class AppModule {}
