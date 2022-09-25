import { Injectable } from '@nestjs/common';
import { Repository, In, DataSource } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  findTagsByFirstName(firstNames: string[]): Promise<User[]> {
    return this.find({
      where: {
        firstName: In(firstNames),
      },
    });
  }
}
