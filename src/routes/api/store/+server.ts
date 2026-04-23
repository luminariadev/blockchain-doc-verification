// POST /api/store - Endpoint untuk menyimpan hash ke blockchain
import type { RequestHandler } from './$types';
import { storeHashToBlockchain } from '$lib/blockchain/client';
import { generateDocumentId } from '$lib/utils/hashing';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { hash, filename } = await request.json();
    
    if (!hash || !filename) {
      return new Response(
        JSON.stringify({ error: 'Hash dan filename diperlukan' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Generate document ID unik
    const docId = generateDocumentId(filename);
    
    // Simpan ke blockchain
    const txHash = await storeHashToBlockchain(docId, hash, filename);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Hash berhasil disimpan ke blockchain',
        docId: docId,
        txHash: txHash,
        timestamp: Date.now()
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error storing to blockchain:', error);
    return new Response(
      JSON.stringify({ error: 'Gagal menyimpan hash ke blockchain' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};