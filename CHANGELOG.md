## Build
build: update packages version

## Style
style: rename VALIDATION-SCHEMES to VALIDATION_SCHEMES
style: rename HTTP-ERRORS to HTT_ERRORS
style: rename DIR-ITEM-TYPES to STORAGE_OBJECT_TYPES

## Refactor
refactor(object-storage-route.type): replace body.parentId with destructed from body parentId
refactor(object-storage-storage/upload): change the extention and mime type validation
refactor: parentId must be always provided when uploading files
refactor: rename dirService to objectStorageService
refactor: update vinejs DIR_UPLOAD_PROCESS_OPTIONS validation scheme
refactor: move form data to object converting and validation before authorization and verification checks
refactor: replace is.js utility with @maksims/is.js package
refactor: replace form data to object convert utility with @maksims/form-multipart-encoder.js package
refactor: replace logger.js utility with @maksims/logger.js package
refactor: replace dotenv package with @maksims/dotenv.js package

## Build
build: replace thrid party packages with custom packages
