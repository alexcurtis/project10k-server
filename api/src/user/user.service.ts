import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { User } from './user.model';
import { InputUserDto } from './user.dto';
import { Account } from 'src/account/account.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }

    async create(user: InputUserDto, account: Account): Promise<User> {
        // Hash The User Password
        const password = await hash(user.password, 8);
        const newUser = new this.userModel({
            ...user,
            account,
            password,
        });
        return newUser.save();
    }
}
