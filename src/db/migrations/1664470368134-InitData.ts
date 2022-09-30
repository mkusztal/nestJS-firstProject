import { Tag } from 'src/products/db/tag.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AppDataSource } from 'src/app.datasource';

export class InitData1664470368134 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    this.saveTags();
    this.saveProducts(await this.saveTags());
    this.saveUsers();
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" RENAME COLUMN "name" TO "title"`,
    );
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
      tagsArr.push(await AppDataSource.getRepository('Tag').save(tagToSave));
    }

    console.log('Tags saved');

    return tagsArr;
  }

  private async saveProducts(tags: Tag[]): Promise<void> {
    const products = [];

    for (let i = 0; i < 100; i++) {
      const product = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        count: faker.datatype.number(100),
        tags: [tags[0], tags[1]],
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      products.push(product);
    }
    await AppDataSource.getRepository('Product').save(products);
  }

  private async saveUsers(): Promise<void> {
    const users = [];
    for (let i = 0; i < 100; i++) {
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

      users.push(user);
    }

    await AppDataSource.getRepository('User').save(users);
  }

  private async saveUserAddress(): Promise<void> {
    const userAddresses = [];
    for (let i = 0; i < 100; i++) {
      const userAddress = {
        country: faker.address.country(),
        city: faker.address.city(),
        street: faker.address.street(),
        number: faker.address.buildingNumber(),
      };

      userAddresses.push(userAddress);
    }

    await AppDataSource.getRepository('UserAddress').save(userAddresses);
  }
}
