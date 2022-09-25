import { Roles } from '../enums/roles.enum';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserAddress } from '../db/userAddress.entity';

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: Date;
  address: Array<UserAddress>;
  role?: Array<Roles>;
}

export class UpdateUserAddressDto {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  @IsNumber()
  number: number;
}
