import { Injectable } from '@nestjs/common';
import { UserRequireUniqueEmailException } from './exception/unique-email-exception';
import { UsersDataService } from './users-data.service';

@Injectable()
export class UserValidatorService {
  constructor(private userRepository: UsersDataService) {}

  async validateUniqueEmail(email: string): Promise<void> {
    const checkUniqueEmail = await this.userRepository.getUserByEmail(email);
    if (checkUniqueEmail) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
