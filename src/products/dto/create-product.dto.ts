import { Tags } from '../enums/tags.enum';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  MinLength,
  MaxLength,
  IsArray,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(25)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;

  @IsEnum(Tags, { each: true })
  @IsArray()
  tags: Tags[];
}
