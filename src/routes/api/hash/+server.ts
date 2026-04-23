// POST /api/hash - Endpoint untuk menghitung SHA-256 hash dari file
import type { RequestHandler } from './$types';
import { generateSHA256Hash } from '$lib/utils/hashing';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'Tidak ada file yang diupload' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Konversi file ke buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate hash
    const hash = await generateSHA256Hash(buffer);
    
    return new Response(
      JSON.stringify({
        success: true,
        hash: hash,
        filename: file.name,
        size: file.size,
        type: file.type
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error hashing file:', error);
    return new Response(
      JSON.stringify({ error: 'Gagal menghitung hash dokumen' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};