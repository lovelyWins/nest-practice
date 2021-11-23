import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductController {

  // injecting service to add controller function
  constructor(private productService: ProductService) { }


  // creating post route
  // there is body decorator which we use to configure req body parameters
  @Post()
  addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number
  ): any {
    const generatedId = this.productService.insertProduct(productTitle, productDesc, productPrice)
    return { id: generatedId }
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
    return {...product}
  }




}