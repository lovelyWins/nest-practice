import { CreateUserDto } from './createUser.dto';
import { User } from './user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose"
import * as  bcrypt from "bcrypt"



@Injectable()
export class UserService {
    constructor(@InjectModel('User') private UserModel: Model<User>) { }

    // function to add user
    async addUser(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 8);
            const user = await new this.UserModel({
                name: createUserDto.name,
                email: createUserDto.email,
                password: hashedPassword
            })
            

            user.save()
            return user
        } catch (error) {
            throw error
        }
    }

    //finding user
    async findUserByEmail(email: string) {
        try {
            const user = await this.UserModel.find({ email: email })
            console.log(user)
            if (!user) {
                throw new Error('cannot find user')
            }
            return user
        }
        catch (error) {
            throw error
        }
    }









}
