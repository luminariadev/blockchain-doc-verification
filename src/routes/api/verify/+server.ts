// POST /api/verify - Endpoint untuk verifikasi dokumen
import type { RequestHandler } from './$types';
import { verifyHashFromBlockchain } from '$lib/blockchain/client';
import { generateSHA256Hash } from '$lib/utils/hashing';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const docId = formData.get('docId') as string;
    
    if (!file || !docId) {
      return new Response(
        JSON.stringify({ error: 'File dan Document ID diperlukan' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Hitung hash dari file yang diupload
    const buffer = Buffer.from(await file.arrayBuffer());
    const currentHash = await generateSHA256Hash(buffer);
    
    // Verifikasi dengan blockchain
    const result = await verifyHashFromBlockchain(docId, currentHash);
    
    return new Response(
      JSON.stringify({
        success: true,
        verification: result
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error verifying document:', error);
    return new Response(
      JSON.stringify({ error: 'Gagal memverifikasi dokumen' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};