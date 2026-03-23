## Chore
chore: update project minor version
chore: update package version

## Fix
fix(const/VALIDATION-SCHEMES): DIR_UPLOAD has mutated the UUIDScheme
fix: parameters type error
fix(service/object-storage/remove): files was not removed

## Refactor
refactor(service/user/send-reset-password-email): migrate to new CaughtError version
refactor(config/multer): migrate to new CaughtError version
refactor(repo/SQL): small changes
refactor(service/user/send-confirm-email): migrate to new CaughtError version
refactor(service/user/reset-password): migrate to new CaughtError version
refactor(service/user/create): migrate to new CaughtError version
refactor(route/user/create): migrate to new CaughtError version
refactor(route/user/confirm-email): migrate to new CaughtError version
refactor(service/object-storage/move): removed redundat db request
refactor(service/object-storage/get-all): removed redundat db request
refactor(route/user/request-reset-password): removed redundat db request
refactor(route/user/log-in): removed redundat db request
refactor(route/object-storage/upload): removed redundat db request
refactor(route/object-storage/remove): removed redundat db request
refactor: removed preview route (get-all handle all file types)
refactor: removed preview route (get-all handle all file types)
refactor(route/object-storage/move): removed redundat db request
refactor(route/object-storage/get-all): removed redundat db request
refactor(route/object-storage/create): removed redundat db request
refactor(route/object-storage/copy): removed redundat db request
refactor(route/404): migrate to new CaughtError version
refactor(middleware/is-verified): migrate to new CaughtError version
refactor(middleware/is-not-verified): migrate to new CaughtError version
refactor(middleware/is-authorized): migrate to new CaughtError version
refactor(middleware/handle-error): migrate to new CaughtError version
refactor: moved check functions into is.util.ts file

## Features
feat: add mime_type to StorageObject type
feat: add types for some services
feat(service/object-storage/copy): return a array of copied items
feat: replace userId of type string with use of type User
feat: add file path validation
feat: add ffmpeg processing for media files
feat: add constants with HTTP codes for new CaughtError version
feat: add wrapper for ffmpeg CLI (must be installed on machine)
