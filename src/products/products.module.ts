import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDataService } from './products-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './db/tag.repository';
import { ProductRepository } from './db/product.repository';
import { Tag } from './db/tag.entity';
import { Product } from './db/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    TypeOrmModule.forFeature([Product]),
  ],

  controllers: [ProductsController],
  providers: [ProductsDataService, ProductRepository, TagRepository],
})
export class ProductsModule {}
