import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from "./product.model"
import { InjectModel } from '@nestjs/mongoose'; ``
import { Model } from 'mongoose';
import { AddProductDto } from './product.dto';


@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private ProductModel: Model<Product>) { }

    // creating function that'll  insert product in that "products" array
    async insertProduct(addProductDto: AddProductDto) {
        // creating new product instance
        const newProduct = await new this.ProductModel({
            title: addProductDto.title,
            description: addProductDto.description,
            price: addProductDto.price
        })
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

    // function for update product by id
    async updateProduct(prodId: string, prodTitle: string, prodDescription: string, prodPrice: number) {
        try {
            const updatedProduct = await this.ProductModel.findById(prodId)
            if (prodTitle) { updatedProduct.title = prodTitle }
            if (prodDescription) { updatedProduct.description = prodDescription }
            if (prodPrice) { updatedProduct.price = prodPrice }
            await updatedProduct.save()
        }
        catch (e) {
            throw new Error('failed to update')
        }
    }

    // function for deleting product by id
    async deleteProductById(prodId: string) {
        try {
            await this.ProductModel.findByIdAndDelete(prodId)
        } catch (error) {
            throw error
        }
    }


}