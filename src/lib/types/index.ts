// Type definitions untuk proyek blockchain document verification

export interface DocumentHash {
  id: string;           // Document ID (bisa dari nama file + timestamp)
  hash: string;         // SHA-256 hash dari dokumen
  filename: string;     // Nama file asli
  timestamp: number;    // Waktu upload (Unix timestamp)
  txHash?: string;      // Transaction hash dari blockchain
}

export interface VerificationResult {
  isValid: boolean;
  message: string;
  currentHash: string;
  storedHash: string;
  timestamp?: number;
}

export interface StoreHashRequest {
  docId: string;
  hash: string;
  filename: string;
}

export interface VerifyRequest {
  docId: string;
  hash: string;
}