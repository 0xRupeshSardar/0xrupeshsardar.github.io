import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const crypto = require('crypto');

const SALT = Buffer.from('0xrupesh-blog-salt-v1', 'utf8');
const ITERATIONS = 100000;

function encrypt(plaintext, password) {
  const key = crypto.pbkdf2Sync(password, SALT, ITERATIONS, 32, 'sha256');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  const combined = Buffer.concat([iv, encrypted, tag]);
  return combined.toString('base64');
}

const password = process.argv[2];
const text = process.argv[3];

if (!password || !text) {
  console.error('Usage: node scripts/encrypt.js <password> <plaintext>');
  process.exit(1);
}

const result = encrypt(text, password);
console.log(result);
