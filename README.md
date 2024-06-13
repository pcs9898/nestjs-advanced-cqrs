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

## Health Module

- [x] api1-check/v1
- [x] testCode

## Auth Module

- [x] api2-signup/v1
- [x] api3-verifyAuthCode/v1
- [x] api4-resendAuthCode/v1
- [x] api5-signin/v1
- [x] api6-restoreAccessToken/v1
- [x] api7-signout/v1
- [] cqrs
- [x] testCode

## Mail Module

- [x] MailService-sendAuthCode
- [x] MailService-sendFindTop5downloadVideos
- [x] testCode

## User Module

- [x] api8-findAll/v1
- [x] api9-findOne/v1
- [] cqrs
- [x] testCode

## Schedule-batch Module

- [x] ScheduledBatchService-unVerifiedUserOver30DaysCleanUp
- [x] testCode

## Video Module

- [x] api10-upload/v1
- [x] api11-findAll/v1
- [x] api12-findOne/v1
- [x] api13-download/v1
- [] cqrs
- [x] testCode

## Analytics Module

- [] api14-findTop5Download/v1
- [] testCode
