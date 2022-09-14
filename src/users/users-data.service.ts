import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  getAllUsers(): Array<User> {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  addUser(_item_: CreateUserDto): ExternalUserDto {
    const user: User = {
      ..._item_,
      id: uuidv4(),
    };

    this.users.push(user);

    return {
      ...user,
    };
  }

  updateUser(_id_: string, _item_: UpdateUserDto): User {
    const user = this.getUserById(_id_);
    const index = this.users.findIndex((_item_) => _item_.id === _id_);

    this.users[index] = {
      ...user,
      ..._item_,
    };

    return this.users[index];
  }

  deleteUser(_id_: string): void {
    this.users = this.users.filter((i) => i.id !== _id_);
  }
}
