import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { v4 as uuidv4 } from 'uuid';
import { ExternalProductDto } from './dto/external-product.dto';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsDataService {
  private products: Array<Product> = [];

  newId = uuidv4();

  getAllProducts(): Array<Product> {
    return this.products;
  }

  getProductById(id: string): Product {
    return this.products.find((product) => product.id === id);
  }

  addProduct(_item_: CreateProductDto): ExternalProductDto {
    const product: Product = {
      ..._item_,
      id: this.newId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }

  updateProduct(_id_: string, _item_: UpdateProductDto): Product {
    const product = this.getProductById(_id_);
    const index = this.products.findIndex((_item_) => _item_.id === _id_);
    this.products[index] = {
      ...product,
      ..._item_,
    };
    return this.products[index];
  }

  deleteProduct(_id_: string): void {
    this.products = this.products.filter((i) => i.id !== _id_);
  }
}
