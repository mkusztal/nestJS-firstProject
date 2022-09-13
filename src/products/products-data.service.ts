import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsDataService {
    updateProduct(_item_: UpdateProductDto): import("./interfaces/product.interface").Product {
        throw new Error('Method not implemented.');
    }
    deleteProduct(_id_: string): void {
        throw new Error('Method not implemented.');
    }
    getAllProducts(): import("./interfaces/product.interface").Product {
        throw new Error('Method not implemented.');
    }
    getProductById(_id_: string): import("./interfaces/product.interface").Product {
        throw new Error('Method not implemented.');
    }
    addProduct(_item_: CreateProductDto): import("./interfaces/product.interface").Product {
        throw new Error('Method not implemented.');
    }
}
