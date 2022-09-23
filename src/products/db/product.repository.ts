import { EntityRepository, Repository, In } from 'typeorm';
import { Product } from './products.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findTagsByName(names: string[]): Promise<Product[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  }
}
