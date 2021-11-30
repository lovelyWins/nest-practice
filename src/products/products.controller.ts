import { AddProductDto } from './product.dto';
import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";

  @Controller('products')
export class ProductController {

  // injecting service to add controller function
  constructor(private productService: ProductService) { }


  // creating post route
  // there is body decorator which we use to configure req body parameters
  @Post()
  async addProduct(
    @Body() addProductDto: AddProductDto
  ) {
    await this.productService.insertProduct(addProductDto)
    return { message: "Product created" }
  }

  // creating path to get all products
  @Get()
  getAllProducts() {
    return this.productService.getProducts()
  }

  // creating path to get one product by id
  @Get(':id')
  getOneProduct(@Param('id') prodId: string) {
    const product = this.productService.getOneProduct(prodId)
    return product
  }


  @Patch()
  async updateOneProduct(
    @Body('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number
  ) {
    await this.productService.updateProduct(prodId, prodTitle, prodDescription, prodPrice)
    return { message: "product updated" }
  }

  @Delete('id')
  async deleteOneProduct(@Param('id') prodId: string) {
      await this.productService.deleteProductById(prodId)
      return {message:"product deleted"}
  }

}