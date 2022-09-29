import { Tag } from 'src/products/db/tag.entity';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Product } from 'src/products/db/products.entity';

export class InitData1664470368134 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    this.saveTags();
    this.saveProduct(await this.saveTags());
    this.saveUser();
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" RENAME COLUMN "name" TO "title"`,
    ); // reverts things made in "up" method
  }

  private async saveTags(): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    const tags = [
      {
        name: 'NEW',
      },
      {
        name: 'PROMO',
      },
      {
        name: 'LAST_ITEMS',
      },
    ];

    for (const tag of tags) {
      const tagToSave = new Tag();
      tagToSave.name = tag.name;
      tagsArr.push(await getRepository('Tag').save(tagToSave));
    }

    console.log('Tags saved');

    return tagsArr;
  }

  private async saveProduct(tags: Tag[]): Promise<void> {
    const product = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      count: faker.datatype.number(100),
      tags: [tags[0], tags[1]],
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };

    await getRepository('Product').save(product);
  }

  private async saveUser(): Promise<void> {
    const savedId = faker.datatype.uuid();

    const user = {
      id: savedId,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.past(),
      address: await this.saveUserAddress(),
      role: 'ADMIN',
    };

    await getRepository('User').save(user);
  }

  private async saveUserAddress(): Promise<void> {
    const userAddress = {
      country: faker.address.country(),
      city: faker.address.city(),
      street: faker.address.street(),
      number: faker.address.buildingNumber(),
    };

    await getRepository('UserAddress').save(userAddress);
  }
}
