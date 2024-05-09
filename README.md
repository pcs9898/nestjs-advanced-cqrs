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

- [x] api1-signup/v1
- [x] api2-verifyAuthCode/v1
- [x] api3-resendAuthCode/v1
- [x] api4-signin/v1
- [x] api5-restoreAccessToken/v1
- [x] api6-signout/v1
- [] cqrs
- [] testCode

## Health Module

- [x] api8-check/v1
- [x] testCode

## Mail Module

- [x] MailService-sendAuthCode
- [x] MailService-sendFindTop5downloadVideos
- [x] testCode

## Schedule-batch Module

- [] ScheduledBatchService-unVerifiedUserOver30DaysCleanUp
- [] testCode

## User Module

- [] api10-findAll/v1
- [] api11-findOne/v1
- [] cqrs
- [] testCode

## Video Module

- [] api12-upload/v1
- [] api13-findAll/v1
- [] api14-findOne/v1
- [] api15-download/v1
- [] cqrs
- [] testCode

## Analytics Module

- [] api16-findTop5Download/v1
- [] testCode
