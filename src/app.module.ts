import { ProductModule } from './products/products.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ProductModule, UserModule, MongooseModule.forRoot('mongodb://localhost/nest-practice'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
