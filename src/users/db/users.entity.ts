import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Roles } from '../enums/roles.enum';
import { UserAddress } from './userAddress.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column('enum', {
    enum: Roles,
  })
  role: Roles;

  @OneToMany((type) => UserAddress, (address) => address.user)
  address?: UserAddress[];
}
