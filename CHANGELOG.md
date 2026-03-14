## Fix
fix: typescript errors

## Features

feat: add services for new features
feat: add routes for new features
feat: add env variables for new features
feat: add validation for new features
feat: add password reseting
feat: add email confirmation after registration

## Refactor

refactor: remove redundant services
refactor: small changes
refactor: rename refresh-token into regenerate-refresh-token
refactor: remove getById service call
refactor: remove verify service call
refactor: remove init service call
refactor: split verify module into two modules, one for user password verification and one for user tokens generation
refactor: replace auth with two middlewares for user authorization and verification check
refactor: replace single token generation calls with user service for tokens generation
