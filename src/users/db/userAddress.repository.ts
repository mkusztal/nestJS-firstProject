import { Injectable } from '@nestjs/common';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { UserAddress } from './userAddress.entity';

@Injectable()
@EntityRepository()
export class UserAddressRepository extends Repository<UserAddress> {
  constructor(private dataSource: DataSource) {
    super(UserAddress, dataSource.createEntityManager());
  }
  async deleteUserAddressesByUserId(userId: string): Promise<void> {
    const usersAddresses = await this.find({
      where: {
        id: userId,
      },
    });

    this.remove(usersAddresses);
  }
}
