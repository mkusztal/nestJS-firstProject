import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersDataService } from './users-data.service';
import { UserValidatorService } from './user-validator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './db/user.repository';
import { UserAddress } from './db/userAddress.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersDataService, UserValidatorService],

  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([UserAddress]),
  ],
})
export class UsersModule {}
