import { Roles } from '../enums/roles.enum';
import { Transform, Type, TransformFnParams } from 'class-transformer';
import { arrayToDate } from '../../shared/helpers/date.helper';

import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform((d) => arrayToDate(d))
  dateOfBirth: Date;

  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDto)
  address?: Array<CreateUserAddressDto>;

  @IsEnum(Roles)
  role: Roles[];
}

export class CreateUserAddressDto {
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
