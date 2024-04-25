# nestjs-advanced-cqrs completion

crud, upload, download

db postgres, redis, migration, seed, index

config service, custom decorator, custom filter, custom guard, custom interceptor, custom middleware

mailing(auth code, analytics), notification with sentry, slack

rate limit (throttle), health check, scheduling(batch, analytics)

unit test, e2e test

applying cqrs for all module

## Initial Settings

- [x] db entity, migration, index, seed
- [x] common
- [] app.module.ts, main.ts settings

## Auth Module

- [] feature1/signup
- [] feature2/signin
- [] feature3/verifyEmail
- [] feature4/resendAuthCode
- [] feature5/restoreRefreshToken
- [] feature6/signout
- [] feature7/resendAuthCode
- [] cqrs
- [] testCode

## Health Module

- [] feature8/signup
- [] testCode

## Mail Module

- [] MailService-sendUserServiceAuthCode
- [] MailService-sendAnalyticsServiceFindTop5downloadVideos
- [] testCode

## Schedule-batch Module

- [] ScheduledBatchService-unVerifiedUserOver30DaysCleanUp
- [] testCode

## User Module

- [] feature10/findAll
- [] feature11/findOne
- [] cqrs
- [] testCode

## Video Module

- [] feature12/upload
- [] feature13/findAll
- [] feature14/findOne
- [] feature15/download
- [] cqrs
- [] testCode

## Analytics Module

- [] feature16/findTop5Download
- [] testCode
