import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductsDataService } from './products-data.service';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get()
  getAllProducts(): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.getAllProducts());
  }

  @Get(':id')
  getProductById(@Param('id') _id_: string): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.getProductById(_id_),
    );
  }

  @Post()
  addProduct(@Body() _item_: CreateProductDto): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.addProduct(_item_));
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') _id_: string): void {
    return this.productRepository.deleteProduct(_id_);
  }

  @Put(':id')
  updateProduct(
    @Param('id') _id_: string,
    @Body() _item_: UpdateProductDto,
  ): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(_id_, _item_),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
    };
  }
}
