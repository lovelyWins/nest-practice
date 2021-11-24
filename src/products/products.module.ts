import { ProductSchema } from './product.model';
import { ProductService } from "./products.service";
import { ProductController } from "./products.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }