import { CLOUD_CONFIG } from '../../config/cloudConfig.js'
import { CloudBackupCodec } from './CloudBackupCodec.js'
import { CloudKeyVault } from './CloudKeyVault.js'
import { CloudSyncService } from './CloudSyncService.js'
import { CloudSyncStateStorage } from './CloudSyncStateStorage.js'
import { DriveAppDataClient } from './DriveAppDataClient.js'
import { GoogleAuthService } from './GoogleAuthService.js'
import { GoogleIdentityLoader } from './GoogleIdentityLoader.js'

export * from './CloudSyncError.js'
export * from './CloudSyncService.js'
export * from './CloudBackupCodec.js'
export * from './CloudKeyVault.js'
export * from './DriveAppDataClient.js'
export * from './GoogleAuthService.js'

var loader = new GoogleIdentityLoader()
var auth = new GoogleAuthService(CLOUD_CONFIG.googleClientId, CLOUD_CONFIG.scope, loader)
var drive = new DriveAppDataClient(auth, CLOUD_CONFIG.backupFilePrefix)
var vault = new CloudKeyVault()
var storage = new CloudSyncStateStorage()

var serviceInstance = null

export function getCloudSyncService(serviceStore) {
  if (!serviceInstance && serviceStore) {
    var codec = new CloudBackupCodec(serviceStore, vault)
    serviceInstance = new CloudSyncService({
      auth,
      drive,
      codec,
      vault,
      storage,
      serviceStore
    })
  }
  return serviceInstance
}
