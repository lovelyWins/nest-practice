import { User } from './../user/user.model';
import { LoginDto } from './auth.dto';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {


    constructor(private userService: UserService) { }

    //function for validating user
    async validater(logindto: LoginDto): Promise<any> {
        const user: any = await this.userService.findUserByEmail(logindto.email)

        //comparing password
        const isMatched = await bcrypt.compare(logindto.password, user.password);
        console.log(isMatched)

        if (isMatched) {
            return user
        } else {
            throw new UnauthorizedException()
        }

    }



}
