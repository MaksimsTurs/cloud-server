## Fixes
fix: imports
fix(utils/jwt): types imports
fix: typescript errors

## Features
feat(index): create of server config
feat(service/user): add authorization and re-generation of refresh token and intergation with object storage
feat(route/user): add authorization and re-generation of refresh token and intergation with object storage
feat: add more queries, rename some queries and add some typesafety
feat: add query to get parent and all their childrens
feat: add utility module to join multiple mysql conditions
feat: add utility module with validation functions
feat: add constnant with collection of unsupported file extentions and mime types
feat: integrate refresh token with create dir service
feat: integrate authorization with refresh token with read dir service
feat: add refresh token regeneration
feat: add virtual directory creation
feat: add repositories for file and directory objects
feat: issue refresh token on user log in and log up

## Refactor
refactor(service/dir): migrate filesystem implementation to virtual storage and rename related modules and types
refactor(route/dir): migrate filesystem implementation to virtual storage and rename related modules and types
refactor: rename types for consistency
refactor: replace custom argon2i hash generator with argon2 library
refactor: replace getUserBasePath with server config variables
refactor: move identical schemas into variables
refactor: move identical schemas into variables
refactor: replace direct env variable access with server config
refactor: replace direct env variable access with server config
refactor: replace direct env variable access with server config
refactor: add function to collect all enviroment variables
refactor: replace getCorsOrigin with server config variables
refactor: rootPath is not saved in db anymore
refactor: add a items parent to response value of get all storage objects route
