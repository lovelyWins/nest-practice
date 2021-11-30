import { LocalAuthGuard } from './../auth/local-auth.guard';
import { LoginDto } from './../auth/auth.dto';
import { CreateUserDto } from './createUser.dto';
import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from "@nestjs/common";
import { UserService } from './user.service';


@Controller('users')
export class UserController {

    // injecting user-service into user-controller
    constructor(private userService: UserService) { }


    //registering user
    @Post()
    async addUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.addUser(createUserDto)
        return { message: "user created" }
    }


    // login user
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async loginUser(
        @Request() req
    ) {
        return req.user
    }


}