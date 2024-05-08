import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SignupReqDto {
  @ApiProperty({ required: true, example: 'aa@a.com' })
  @MinLength(4)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: '1234' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true, example: '1234' })
  @IsNotEmpty()
  passwordConfirm: string;
}

export class SigninReqDto {
  @ApiProperty({ required: true, example: 'aa@a.com' })
  @MinLength(4)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: '1234' })
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}

export class VerifyEmailAuthCodeReqDto {
  @ApiProperty({ required: true, example: '000000' })
  @IsNotEmpty()
  @IsInt()
  @Matches(/^\d{6}$/) // check is it 6 digit number
  authCode: number;
}
