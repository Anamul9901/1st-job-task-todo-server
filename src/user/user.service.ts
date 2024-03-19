/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/User';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const model = new this.UserModel();
    model.name = createUserDto.name;
    model.email = createUserDto.email;
    model.photo = createUserDto.photo;
    return model.save();
  }

  findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  findOne(id: string) {
    return this.UserModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.updateOne(
      { _id: id },
      {
        name: updateUserDto.name,
        email: updateUserDto.email,
        photo: updateUserDto.photo,
      },
    ).exec();
  }

  remove(id: string) {
    return this.UserModel.deleteOne({ _id: id }).exec();
  }
}
