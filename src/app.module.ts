import { ProductModule } from './products/products.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProductModule, MongooseModule.forRoot('mongodb://localhost/nest-practice')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
