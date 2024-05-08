import { UserAuth } from './entity/userAuth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { JwtUnVerifiedStrategy } from './strategy/jwt-unVerified.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAuth]),
    UserModule,
    PassportModule,
    JwtModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtUnVerifiedStrategy,
    Logger,
  ],
})
export class AuthModule {}
