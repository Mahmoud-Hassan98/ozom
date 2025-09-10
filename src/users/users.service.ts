import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    const exists = await this.userModel.findOne({ email: 'admin@gmail.com' });
    if (!exists) {
      const hashedPassword = await bcrypt.hash('admin@123', 10);
      await this.userModel.create({
        username: 'Mahmoud',
        email: 'admin@gmail.com',
        password: hashedPassword,
      });    }
  }
}