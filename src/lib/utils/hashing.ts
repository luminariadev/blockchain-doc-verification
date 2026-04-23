// Utility untuk SHA-256 hashing
import crypto from 'crypto';

/**
 * Menghasilkan SHA-256 hash dari buffer file
 * @param buffer - Buffer dari file yang diupload
 * @returns Hexadecimal string hash (64 karakter)
 */
export async function generateSHA256Hash(buffer: Buffer): Promise<string> {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

/**
 * Menghasilkan document ID unik
 * @param filename - Nama file asli
 * @returns Document ID (format: filename_timestamp)
 */
export function generateDocumentId(filename: string): string {
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `${sanitizedFilename}_${timestamp}`;
}

/**
 * Validasi apakah string adalah SHA-256 hash yang valid
 * @param hash - String hash yang akan divalidasi
 * @returns Boolean
 */
export function isValidSHA256Hash(hash: string): boolean {
  return /^[a-f0-9]{64}$/i.test(hash);
}