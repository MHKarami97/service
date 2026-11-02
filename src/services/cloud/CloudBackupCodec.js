import { CLOUD_CONFIG } from '../../config/cloudConfig.js'
import {
  hashSha256,
  decryptWithKey,
  deriveKey,
  encryptWithKey,
  stableStringify
} from '../../utils/cloudCrypto.js'
import { CloudSyncError } from './CloudSyncError.js'

export class CloudBackupCodec {
  constructor(serviceStore, vault) {
    this.serviceStore = serviceStore
    this.vault = vault
  }

  async snapshotLocal() {
    var payload = this.serviceStore.buildPayload()
    return { payload, fingerprint: await this.fingerprintOf(payload) }
  }

  async fingerprintOf(payload) {
    var items = Array.isArray(payload.items) ? payload.items : []
    var recordsCount = items.length
    for (var item of items) {
      if (Array.isArray(item.serviceRecords)) {
        recordsCount += item.serviceRecords.length
      }
    }
    // Sort items by ID for deterministic hash
    var sortedItems = [...items].sort((a, b) => {
      var idA = String(a.id || '')
      var idB = String(b.id || '')
      return idA < idB ? -1 : idA > idB ? 1 : 0
    })
    var contentHash = await hashSha256(
      stableStringify({
        items: sortedItems,
        theme: payload.theme || 'light'
      })
    )
    return { contentHash, recordsCount }
  }

  async serialize(snapshot, encrypt) {
    var json = JSON.stringify(snapshot.payload)
    if (!encrypt) return json

    var record = await this.vault.getKey()
    if (!record) {
      throw new CloudSyncError('KEY_MISSING', 'کلید رمزنگاری روی این دستگاه موجود نیست؛ رمزنگاری را دوباره فعال کنید.')
    }

    var encrypted = await encryptWithKey(json, record.key)
    var container = {
      format: 'service-management-encrypted-backup',
      version: '1.0',
      algorithm: 'AES-GCM',
      kdf: 'PBKDF2',
      iterations: record.iterations,
      salt: record.saltHex,
      iv: encrypted.iv,
      ciphertext: encrypted.ciphertext,
      checksum: await hashSha256(json),
      meta: {
        createdAt: snapshot.payload.exportedAt || new Date().toISOString(),
        approxRecordsCount: snapshot.fingerprint.recordsCount,
        contentHash: snapshot.fingerprint.contentHash,
        source: 'cloud'
      }
    }
    return JSON.stringify(container)
  }

  async open(content, passphrase) {
    var parsed
    try {
      parsed = JSON.parse(content)
    } catch {
      throw new CloudSyncError('INVALID_BACKUP', 'فایل پشتیبان ابری آسیب دیده است.')
    }

    if (parsed.format !== 'service-management-encrypted-backup') {
      if (parsed.items && Array.isArray(parsed.items)) return parsed
      throw new CloudSyncError('INVALID_BACKUP', 'فرمت فایل پشتیبان ابری معتبر نیست.')
    }

    var container = parsed
    var json = await this.decrypt(container, passphrase)
    if ((await hashSha256(json)) !== container.checksum) {
      throw new CloudSyncError('INVALID_BACKUP', 'یکپارچگی فایل پشتیبان ابری تأیید نشد.')
    }
    return JSON.parse(json)
  }

  async decrypt(container, passphrase) {
    if (!passphrase) {
      var record = await this.vault.getKey()
      var matches = !!record && record.saltHex === container.salt && record.iterations === container.iterations
      if (!record || !matches) {
        throw new CloudSyncError('PASSPHRASE_REQUIRED', 'برای باز کردن این پشتیبان، رمز عبور آن را وارد کنید.')
      }
      try {
        return await decryptWithKey(container.ciphertext, container.iv, record.key)
      } catch {
        throw new CloudSyncError('PASSPHRASE_REQUIRED', 'برای باز کردن این پشتیبان، رمز عبور آن را وارد کنید.')
      }
    }

    if (passphrase.length < CLOUD_CONFIG.minPassphraseLength) {
      throw new CloudSyncError('PASSPHRASE_INVALID', 'رمز عبور وارد شده کوتاه‌تر از حد مجاز است.')
    }

    var key = await deriveKey(passphrase, container.salt, container.iterations)
    try {
      var json = await decryptWithKey(container.ciphertext, container.iv, key)
      await this.vault.saveKey(key, container.salt, container.iterations)
      return json
    } catch {
      throw new CloudSyncError('PASSPHRASE_INVALID', 'رمز عبور اشتباه است یا فایل پشتیبان دستکاری شده است.')
    }
  }
}
