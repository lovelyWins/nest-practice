import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from "./product.model"


@Injectable()
export class ProductService {

    // creating product array for now
    products: Product[] = []


    // creating function that'll  insert product in that "products" array
    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString()
        // creating new product instance
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct)
        return prodId
    }

    // function for get all products
    getProducts() {
        // simply returning this.products will return original products array, which is undesired
        // because if you want to edit that obj and return that edited version, it'll also update original obj
        return [...this.products]
    }


    // function for get one product by id
    getOneProduct(prodId: string) {
        const product = this.products.filter(prod => prod.id === prodId)
        // if we don't get product of given id
        if (!product) {
            throw new NotFoundException('could not find product')
        }
        return { ...product }
    }

    

}