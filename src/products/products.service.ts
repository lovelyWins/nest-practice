import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from "./product.model"
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ProductService {

    // creating product array for now
    products: Product[] = []

    constructor(@InjectModel('Product') private ProductModel: Model<Product>) { }

    // creating function that'll  insert product in that "products" array
    async insertProduct(title: string, description: string, price: number) {
        // creating new product instance
        const newProduct = await new this.ProductModel({ title: title, description: description, price: price })
        await newProduct.save()
        return newProduct

    }

    // function for get all products
    getProducts() {
        // simply returning this.products will return original products array, which is undesired
        // because if you want to edit that obj and return that edited version, it'll also update original obj
        const products = this.ProductModel.find({})
        return products
    }


    // function for get one product by id
    async getOneProduct(prodId: string): Promise<Product> {
        const product = await this.ProductModel.findById(prodId)
        // if we don't get product of given id
        if (!product) {
            throw new NotFoundException('could not find product')
        }
        return product
    }


}