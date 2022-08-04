import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
   constructor(
      @InjectModel(User.name) private readonly userModel: Model<UserDocument>
   ) {
   }

   async all() {
      return this.userModel.find().exec();
   }

}
