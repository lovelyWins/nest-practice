import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException, ValidationPipe } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super() //used for configuration
    }

    async validate(loginDto: LoginDto): Promise<any> {
        const user = await this.authService.validater(loginDto)

        if (!user) {
            throw new UnauthorizedException()
        }
        
        return user;
    }


}