import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.model';

@Module({
  imports: [
   MongooseModule.forRoot('mongodb://localhost:27017/nest_user', {
      autoCreate: true
   }),
   MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
