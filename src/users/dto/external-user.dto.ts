import { Roles } from '../enums/roles.enum';

export interface ExternalUserDto {
  firstName: string;
  lastName: string;
  email: string;
  role: Array<Roles>;
}
