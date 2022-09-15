import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
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
  getAllProducts(): Array<ExternalProductDto> {
    return this.productRepository
      .getAllProducts()
      .map(this.mapProductToExternal);
  }

  @Get(':id')
  getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ExternalProductDto {
    return this.mapProductToExternal(this.productRepository.getProductById(id));
  }

  @Post()
  addProduct(@Body() _item_: CreateProductDto): ExternalProductDto {
    return this.productRepository.addProduct(_item_);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') _id_: string): void {
    return this.productRepository.deleteProduct(_id_);
  }

  @Put(':id')
  @HttpCode(500)
  updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() product: UpdateProductDto,
  ): ExternalProductDto {
    return this.mapProductToExternal(
      this.productRepository.updateProduct(id, product),
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
