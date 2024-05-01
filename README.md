# nestjs-advanced-cqrs completion

crud, upload, download, api versioning

db postgres, redis, migration, seed, index

config service, custom decorator, custom filter, custom guard, custom interceptor, custom middleware

mailing(auth code, analytics), notification with sentry, slack

rate limit (throttle), health check, scheduling(batch, analytics)

unit test, e2e test

applying cqrs for all module

## Initial Settings

- [x] db entity, migration, index, seed
- [x] common
- [x] app.module.ts, main.ts settings

## Auth Module

- [] api1/signupV1
- [] api2/signinV1
- [] api3/verifyEmailV1
- [] api4/resendAuthCodeV1
- [] api5/restoreRefreshTokenV1
- [] api6/signoutV1
- [] api7/resendAuthCodeV1
- [] cqrs
- [] testCode

## Health Module

- [x] api8/checkV1
- [x] testCode

## Mail Module

- [] MailService-sendUserServiceAuthCode
- [] MailService-sendAnalyticsServiceFindTop5downloadVideos
- [] testCode

## Schedule-batch Module

- [] ScheduledBatchService-unVerifiedUserOver30DaysCleanUp
- [] testCode

## User Module

- [] api10/findAllV1
- [] api11/findOneV1
- [] cqrs
- [] testCode

## Video Module

- [] api12/uploadV1
- [] api13/findAllV1
- [] api14/findOneV1
- [] api15/downloadV1
- [] cqrs
- [] testCode

## Analytics Module

- [] api16/findTop5DownloadV1
- [] testCode
