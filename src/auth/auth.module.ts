import { LocalStrategy } from './local.strategy';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, ]
})

export class AuthModule { }
