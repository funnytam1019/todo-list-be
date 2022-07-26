import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>
  ) {}
  
  public async searchUser(params: { email: string }): Promise<IUser[]> {
    return this.userModel.find(params).exec();    
  }

  public async searchUserById(id: any): Promise<IUser> {
    return this.userModel.findById(id).exec();
  }

  public async createUser(user: IUser): Promise<IUser> {
    const userModel = new this.userModel(user);
    return await userModel.save();
  }
}