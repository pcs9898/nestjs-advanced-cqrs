import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from 'src/common/enum/global-enum';

export interface IUserServiceUserIsUserAdmin {
  user_id: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOneById({ id }: { id: string }) {
    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }

  async IsUserAdmin({
    user_id,
  }: IUserServiceUserIsUserAdmin): Promise<boolean> {
    const user = await this.findOneById({ id: user_id });

    return user.role === UserRole.Admin;
  }
}
