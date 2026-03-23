const MALICIOUS_FILES = {
  MIME_TYPES: new Set([
    "application/x-msdownload",
    "application/octet-stream",
    "application/x-msi",
    "application/vnd.microsoft.portable-executable",
    "application/java-archive"
  ]),
  EXTENTIONS: new Set([
    "exe",
    "msi",
    "bat",
    "cmd",
    "com",
    "scr",
    "pif",
    "app",
    "dmg",
    "pkg",
    "deb",
    "rpm",
    "apk",
    "ipa",
    "zip",
    "rar",
    "7z",
    "tar",
    "gz",

    ".exe",
    ".msi",
    ".bat",
    ".cmd",
    ".com",
    ".scr",
    ".pif",
    ".app",
    ".dmg",
    ".pkg",
    ".deb",
    ".rpm",
    ".apk",
    ".ipa",
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",
    ".iso"
  ])
};

export default MALICIOUS_FILES;
