/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAddressDto, UpdateUserDto } from './dto/update-user.dto';
import { User } from './db/users.entity';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/userAddress.repository';
import { UserAddress } from './db/userAddress.entity';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}

  private users: Array<User> = [];

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async addUser(_item_: CreateUserDto): Promise<User> {
    const userToSave = new User();

    userToSave.firstName = _item_.firstName;
    userToSave.lastName = _item_.lastName;
    userToSave.email = _item_.email;
    userToSave.role = _item_.role;
    userToSave.address = await this.prepareUserAddressesToSave(_item_.address);

    return this.userRepository.save(userToSave);
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async updateUser(id: string, _item_: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.getUserById(id);

    userToUpdate.firstName = _item_.firstName;
    userToUpdate.lastName = _item_.lastName;
    userToUpdate.email = _item_.email;

    await this.userRepository.save(userToUpdate);

    return this.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDto[] | UpdateUserAddressDto[],
  ): Promise<UserAddress[]> {
    const addresses = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.number = add.number;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }
}
