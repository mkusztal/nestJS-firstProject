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
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { CreateProductDto } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './db/products.entity';
import { ProductsDataService } from './products-data.service';

@Controller('products')
export class ProductsController {
  constructor(private productRepository: ProductsDataService) {}

  @Get()
  async getAllProducts(): Promise<ExternalProductDto[]> {
    return (await this.productRepository.getAllProducts()).map((product) =>
      this.mapProductToExternal(product),
    );
  }

  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.getProductById(id),
    );
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(
    @Body() _item_: CreateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productRepository.addProduct(_item_),
    );
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() _item_: UpdateProductDto,
  ): Promise<ExternalProductDto> {
    const product = await this.productRepository.updateProduct(id, _item_);
    return this.mapProductToExternal(product);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDto> {
    await this.productRepository.deleteProduct(id);
    return null;
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name),
    };
  }
}
