import { UserAddress } from '../db/userAddress.entity';
import { Roles } from '../enums/roles.enum';

export interface ExternalUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: UserAddress[];
  role: Array<Roles>;
}
