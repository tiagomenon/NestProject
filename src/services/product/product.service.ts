import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/Interfaces/interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProduct(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProductById(id): Promise<Product> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async createProduct(createProduct): Promise<Product> {
    const product = await new this.productModel(createProduct);
    product.save();
    return product;
  }

  async updateProduct(id, updateProduct): Promise<Product> {
    const update = await this.productModel.findByIdAndUpdate(
      id,
      updateProduct,
      { new: true },
    );
    update.save();
    return update;
  }

  async deleteProduct(id): Promise<any> {
    const deleted = await this.productModel.deleteOne(id);
    return deleted;
  }
}
