import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { MongoConfigService } from './services/config/mongo-config.service';
import { UserSchema } from './schemas/user.model';
import { ConfigService } from './services/config/config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '../.env'
  }),
  MongooseModule.forRootAsync({
    useClass: MongoConfigService,
  }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users',
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ConfigService,
  ],
})
export class UserModule {}