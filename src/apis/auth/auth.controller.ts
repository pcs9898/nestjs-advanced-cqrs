import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  RestoreAccessTokenResDto,
  SigninResDto,
  SignupResDto,
  VerifyAuthCodeResDto,
} from './dto/res.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorator/public.decorator';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import {
  SigninReqDto,
  SignupReqDto,
  VerifyAuthCodeReqDto,
} from './dto/req.dto';
import { JwtUnVerifiedGuard } from './guard/jwt-un-verified.guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { IAuthUser } from 'src/common/types/global-types';
import { Throttle } from '@nestjs/throttler';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';

@ApiTags('Auth')
@ApiExtraModels(
  SignupResDto,
  SigninResDto,
  RestoreAccessTokenResDto,
  VerifyAuthCodeResDto,
)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiPostResponse(SignupResDto)
  @Post('signup/v1')
  async signupV1(@Body() data: SignupReqDto): Promise<SignupResDto> {
    return await this.authService.signup(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtUnVerifiedGuard)
  @ApiPostResponse(VerifyAuthCodeResDto)
  @Post('verifyAuthCode/v1')
  async verifyAuthCodeV1(
    @GetUser() { id: userId }: IAuthUser,
    @Body() { authCode }: VerifyAuthCodeReqDto,
  ): Promise<VerifyAuthCodeResDto> {
    return await this.authService.verifyAuthCode({
      userId,
      authCode: Number(authCode),
    });
  }

  @Public()
  @ApiPostResponse(SigninResDto)
  @Throttle({ default: { limit: 3, ttl: 5000 } })
  @Post('signin/v1')
  async signInV1(@Body() data: SigninReqDto): Promise<SigninResDto> {
    return await this.authService.signin(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtUnVerifiedGuard)
  @ApiResponse({ status: 201, type: Boolean })
  @Post('resendAuthCode/v1')
  async resendAuthCodeV1(@GetUser() { id }: IAuthUser): Promise<boolean> {
    return await this.authService.resendAuthCode(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiPostResponse(RestoreAccessTokenResDto)
  @Post('restoreAccessToken/v1')
  async restoreAccessTokenV1(
    @Request() { refreshToken },
    @GetUser() { id }: IAuthUser,
  ): Promise<RestoreAccessTokenResDto> {
    return await this.authService.restoreAccessToken({
      userId: id,
      refreshToken,
    });
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Boolean })
  @Post('signout/v1')
  async signout(@GetUser() { id }: IAuthUser): Promise<boolean> {
    return await this.authService.signout(id);
  }
}
