// Koneksi ke blockchain (untuk sementara dummy, nanti akan terhubung ke testnet)
import type { DocumentHash, VerificationResult } from '$lib/types';

// Untuk sementara, kita simpan hash di Map (simulasi blockchain)
// Nanti akan diganti dengan koneksi ke Ethereum testnet
const mockBlockchain = new Map<string, DocumentHash>();

/**
 * Menyimpan hash ke blockchain (simulasi)
 * @param docId - Document ID
 * @param hash - SHA-256 hash
 * @param filename - Nama file
 * @returns Transaction hash (simulasi)
 */
export async function storeHashToBlockchain(
  docId: string,
  hash: string,
  filename: string
): Promise<string> {
  // Simulasi delay transaksi blockchain (1-2 detik)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const docData: DocumentHash = {
    id: docId,
    hash: hash,
    filename: filename,
    timestamp: Date.now(),
    txHash: `0x${Math.random().toString(36).substring(2, 42)}`
  };
  
  mockBlockchain.set(docId, docData);
  
  return docData.txHash!;
}

/**
 * Memverifikasi hash dengan yang tersimpan di blockchain
 * @param docId - Document ID
 * @param currentHash - Hash dari dokumen yang akan diverifikasi
 * @returns Hasil verifikasi
 */
export async function verifyHashFromBlockchain(
  docId: string,
  currentHash: string
): Promise<VerificationResult> {
  // Simulasi delay query blockchain
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const storedDoc = mockBlockchain.get(docId);
  
  if (!storedDoc) {
    return {
      isValid: false,
      message: 'Document ID tidak ditemukan di blockchain',
      currentHash: currentHash,
      storedHash: ''
    };
  }
  
  const isValid = storedDoc.hash === currentHash;
  
  return {
    isValid: isValid,
    message: isValid 
      ? '✅ Dokumen VALID - Hash cocok dengan yang tersimpan di blockchain'
      : '❌ Dokumen TIDAK VALID - Hash berbeda dari yang tersimpan',
    currentHash: currentHash,
    storedHash: storedDoc.hash,
    timestamp: storedDoc.timestamp
  };
}

/**
 * Mendapatkan data dokumen dari blockchain
 * @param docId - Document ID
 * @returns Data dokumen atau null jika tidak ditemukan
 */
export async function getDocumentFromBlockchain(docId: string): Promise<DocumentHash | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockBlockchain.get(docId) || null;
}

/**
 * Mendapatkan semua dokumen yang tersimpan (untuk dashboard)
 * @returns Array semua dokumen
 */
export async function getAllDocuments(): Promise<DocumentHash[]> {
  return Array.from(mockBlockchain.values());
}