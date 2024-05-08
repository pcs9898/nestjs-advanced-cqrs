import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SignupReqDto } from './dto/req.dto';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from './entity/userAuth.entity';
import { SignupResDto } from './dto/res.dto';
import { User } from '../user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(UserAuth) userAuthRepository: Repository<UserAuth>,
  ) {}

  async signup(data: SignupReqDto): Promise<SignupResDto> {
    const { email, password, passwordConfirm } = data;

    if (password !== passwordConfirm)
      throw new BadRequestException('Password do not match');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error;

    try {
      const user = await queryRunner.manager.findOneBy(User, { email });
      if (user) throw new UnprocessableEntityException('User already exists');

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const userEntity = await queryRunner.manager.save(
        await queryRunner.manager.create(User, {
          email,
          password: hashedPassword,
        }),
      );

      const authCode = this.generateAuthCode();

      await queryRunner.manager.save(
        queryRunner.manager.create(UserAuth, {
          user: userEntity,
          authCode,
        }),
      );

      const unVerifiedToken = this.generateUnVerifiedToken(userEntity.id);
      //TODO: send mail

      await queryRunner.commitTransaction();

      return {
        id: userEntity.id,
        unVerifiedToken,
      };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      error = e;
    } finally {
      await queryRunner.release();
      if (error) throw error;
    }
  }

  private generateAuthCode(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  private generateUnVerifiedToken(user_id: string) {
    const payload = { sub: user_id, tokenType: 'unVerifiedToken' };

    return this.jwtService.sign(payload, {
      expiresIn: '20m',
      secret: this.configService.get('jwt.unVerifiedSecret'),
    });
  }
}
