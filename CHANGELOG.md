## Chore
chore: update package version
chore: rename config files

## Feat
feat: add bubleSort utility
feat: add user service for authentication with cookie
feat: add check for case if user try move folder into itself
feat: change type definitions
feat: replace isAuthorized with isAuthenticated
feat: add is authenticated middleware
feat: add is authenticated middleware
feat: add app context vars
feat: replace "create" function with function for direct data validation
feat: add directory initialization into Applicaiton start function
feat: add ssl based on application mode
feat: add Application class that contains global context (logger, sql, etc.) and lifecycle functions
feat: add simple utility function to compile vine schemes

## Refactor
refactor: replace init with authWithCookie
refactor: remove init.ts
refactor: replace BASE_USERS_PATH with BASE_STORAGE_PATH
refactor: remove optional id
refactor: new object does not take user id anymore
refactor: replace isAuthorized with isAuthenticated
refactor: objects does not take user id anymore
refactor: add types to res param
refactor: rename storageService to objectStorageService
refactor: replace create function with validate
refactor: change error messages
refactor: remove stack logging in error handler
refactor: replace string token exparation time with cookie maxAge
refactor: fix grammer mistakes
refactor (object-storage/get-by-id): fix grammer
refactor: remove redundant utils

## Style
style: rename UserResetPasswordBody to UserResetPasswordReqBody
style: remove comments

## Build
build: update package version and scripts
build: fix tsc has not compiled ts files

## Fix
fix: authorization fails even if refresh token was valid
fix: access and refresh token lifetimes
