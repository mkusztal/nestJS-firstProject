import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ExternalUserDto } from './dto/external-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './db/users.entity';
import { UserValidatorService } from './user-validator.service';
import { UsersDataService } from './users-data.service';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  instanceValidate = new UserValidatorService(this.userRepository);

  @Get()
  async getAllUsers(): Promise<ExternalUserDto[]> {
    return (await this.userRepository.getAllUsers()).map((user) =>
      this.mapUserToExternal(user),
    );
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userRepository.getUserById(id));
  }

  @Post()
  async addProduct(@Body() _item_: CreateUserDto): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userRepository.addUser(_item_));
  }
  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() _item_: UpdateUserDto,
  ): Promise<ExternalUserDto> {
    const user = await this.userRepository.updateUser(id, _item_);
    return this.mapUserToExternal(user);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(id: string): Promise<ExternalUserDto> {
    await this.userRepository.deleteUser(id);
    return null;
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      role: user.role,
    };
  }
}
