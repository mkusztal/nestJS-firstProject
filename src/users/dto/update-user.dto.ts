import { Roles } from '../enums/roles.enum';

export interface UpdateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  role: Array<Roles>;
}
