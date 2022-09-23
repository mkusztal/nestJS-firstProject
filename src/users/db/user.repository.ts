import { EntityRepository, Repository, In } from 'typeorm';
import { User } from './users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findTagsByFirstName(firstNames: string[]): Promise<User[]> {
    return this.find({
      where: {
        firstName: In(firstNames),
      },
    });
  }
}
