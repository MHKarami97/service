var ENV_CLIENT_ID = (import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim()

export var CLOUD_CONFIG = {
  // Public identifier (not a secret). Embedded in bundle by design.
  googleClientId:
    ENV_CLIENT_ID || '627723972815-qrp35936cvbodbo2udkp4qeeh6sgoqms.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/drive.appdata',
  gsiScriptUrl: 'https://accounts.google.com/gsi/client',
  backupFilePrefix: 'service-management.backup.',
  keepVersions: 3,
  autoBackupDebounceMs: 15000,
  silentRetryCooldownMs: 5 * 60 * 1000,
  minPassphraseLength: 8,
  // OWASP Password Storage recommendation for PBKDF2-HMAC-SHA256
  pbkdf2Iterations: 600000,
  inlineUploadLimitBytes: 4 * 1024 * 1024,
  stateStorageKey: 'service-management.cloudSync.v1',
  deviceIdStorageKey: 'service-management.cloudSync.deviceId',
  vaultDatabaseName: 'ServiceCloudDB'
}
