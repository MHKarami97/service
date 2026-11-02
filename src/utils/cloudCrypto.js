export function bufferToHex(buffer) {
  var bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)
  var hex = ''
  for (var i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0')
  }
  return hex
}

export function hexToBuffer(hex) {
  var clean = hex.length % 2 === 0 ? hex : '0' + hex
  var length = clean.length / 2
  var bytes = new Uint8Array(length)
  for (var i = 0; i < length; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  }
  return bytes
}

export function getRandomBytes(length) {
  var array = new Uint8Array(length)
  globalThis.crypto.getRandomValues(array)
  return array
}

export function newSaltHex(length = 16) {
  return bufferToHex(getRandomBytes(length))
}

export async function hashSha256(text) {
  var data = new TextEncoder().encode(text)
  var hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data)
  return bufferToHex(hashBuffer)
}

export async function deriveKey(passphrase, saltHex, iterations) {
  var subtle = globalThis.crypto.subtle
  var salt = hexToBuffer(saltHex)
  var passwordBuffer = new TextEncoder().encode(passphrase.normalize('NFKC'))
  var keyMaterial = await subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveKey']
  )

  return subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt.buffer.slice(salt.byteOffset, salt.byteOffset + salt.byteLength),
      iterations,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

export async function encryptWithKey(plainText, key) {
  var iv = getRandomBytes(12)
  var data = new TextEncoder().encode(plainText)
  var cipher = await globalThis.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv.buffer.slice(iv.byteOffset, iv.byteOffset + iv.byteLength) },
    key,
    data
  )
  return { ciphertext: bufferToHex(cipher), iv: bufferToHex(iv) }
}

export async function decryptWithKey(ciphertextHex, ivHex, key) {
  var iv = hexToBuffer(ivHex)
  var cipher = hexToBuffer(ciphertextHex)
  var plain = await globalThis.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv.buffer.slice(iv.byteOffset, iv.byteOffset + iv.byteLength) },
    key,
    cipher.buffer.slice(cipher.byteOffset, cipher.byteOffset + cipher.byteLength)
  )
  return new TextDecoder().decode(plain)
}

// Deterministic JSON (sorted keys) so equal data always yields an equal hash across devices.
export function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null'
  if (Array.isArray(value)) return '[' + value.map((item) => stableStringify(item)).join(',') + ']'
  var record = value
  var parts = []
  for (var key of Object.keys(record).sort()) {
    if (record[key] === undefined) continue
    parts.push(JSON.stringify(key) + ':' + stableStringify(record[key]))
  }
  return '{' + parts.join(',') + '}'
}
