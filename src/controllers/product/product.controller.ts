import { Controller, Delete, Param, Put, Query } from '@nestjs/common';
import { Body, Post, Res, Get } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { Product } from 'src/Interfaces/interface';
import { ProductService } from 'src/services/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async getProduct(@Res() res) {
    const products = await this.productService.getProduct();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get(':id')
  async getProductById(@Res() res, @Param('id') id) {
    const product = await this.productService.getProductById(id);
    return res.status(HttpStatus.OK).json(product);
  }

  @Post('/create')
  async createProduct(@Res() res, @Body() product: Product) {
    const creating = await this.productService.createProduct(product);
    return res.status(HttpStatus.OK).json({
      message: 'received',
      creating: creating,
    });
  }

  @Put('/update/:id')
  async updateProduct(@Res() res, @Body() product: Product, @Param('id') id) {
    const update = await this.productService.updateProduct(id, product);
    return res.status(HttpStatus.OK).json(update);
  }
  @Delete(':id')
  async deleteProduct(@Res() res, id) {
    const deleting = await this.productService.deleteProduct(id);
    return res.status(HttpStatus.OK).json({
      deleting,
    });
  }
}
