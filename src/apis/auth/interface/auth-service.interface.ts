export interface IAuthServiceVerifyEmailAuthCode {
  userId: string;
  authCode: number;
}

export interface IAuthServiceSaveAuthCodeOnRedis
  extends IAuthServiceVerifyEmailAuthCode {
  ttl: number;
}

export interface IAuthServiceSaveHashedRefreshTokenOnRedis {
  userId: string;
  hashedRefreshToken: string;
}

export interface IAuthServiceRestoreAccessToken {
  userId: string;
  refreshToken: string;
}
