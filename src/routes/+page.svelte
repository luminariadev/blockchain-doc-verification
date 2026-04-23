<script lang="ts">
  // Halaman utama: Upload dan Verifikasi Dokumen
  // Menggunakan Svelte 5 Runes syntax
  
  let activeTab = $state<'upload' | 'verify'>('upload');
  
  // State untuk upload
  let uploadFile = $state<File | undefined>(undefined);
  let uploadLoading = $state(false);
  let uploadResult = $state<any>(null);
  let uploadError = $state<string | null>(null);
  
  // State untuk verify
  let verifyFile = $state<File | undefined>(undefined);
  let verifyDocId = $state('');
  let verifyLoading = $state(false);
  let verifyResult = $state<any>(null);
  let verifyError = $state<string | null>(null);
  
  // Handler untuk upload
  async function handleUpload() {
    if (!uploadFile) {
      uploadError = 'Pilih file terlebih dahulu';
      return;
    }
    
    uploadLoading = true;
    uploadError = null;
    uploadResult = null;
    
    try {
      // Step 1: Hitung hash
      const hashFormData = new FormData();
      hashFormData.append('file', uploadFile);
      
      const hashRes = await fetch('/api/hash', {
        method: 'POST',
        body: hashFormData
      });
      
      const hashData = await hashRes.json();
      
      if (!hashRes.ok) throw new Error(hashData.error);
      
      // Step 2: Simpan ke blockchain
      const storeRes = await fetch('/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hash: hashData.hash,
          filename: uploadFile.name
        })
      });
      
      const storeData = await storeRes.json();
      
      if (!storeRes.ok) throw new Error(storeData.error);
      
      uploadResult = {
        filename: uploadFile.name,
        hash: hashData.hash,
        docId: storeData.docId,
        txHash: storeData.txHash
      };
      
    } catch (err: any) {
      uploadError = err.message;
    } finally {
      uploadLoading = false;
    }
  }
  
  // Handler untuk verify
  async function handleVerify() {
    if (!verifyFile) {
      verifyError = 'Pilih file terlebih dahulu';
      return;
    }
    
    if (!verifyDocId) {
      verifyError = 'Masukkan Document ID';
      return;
    }
    
    verifyLoading = true;
    verifyError = null;
    verifyResult = null;
    
    try {
      const formData = new FormData();
      formData.append('file', verifyFile);
      formData.append('docId', verifyDocId);
      
      const res = await fetch('/api/verify', {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      verifyResult = data.verification;
      
    } catch (err: any) {
      verifyError = err.message;
    } finally {
      verifyLoading = false;
    }
  }
  
  // Reset form
  function resetUpload() {
    uploadFile = undefined;
    uploadResult = null;
    uploadError = null;
  }
  
  function resetVerify() {
    verifyFile = undefined;
    verifyDocId = '';
    verifyResult = null;
    verifyError = null;
  }
  
  // Handle file selection
  function onUploadFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    uploadFile = target.files?.[0];
  }
  
  function onVerifyFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    verifyFile = target.files?.[0];
  }
</script>

<div class="container">
  <h1>🔗 Blockchain Document Verification</h1>
  <p class="subtitle">Menjamin integritas dokumen digital dengan SHA-256 dan Blockchain</p>
  
  <!-- Tab Navigation -->
  <div class="tabs">
    <button 
      class="tab {activeTab === 'upload' ? 'active' : ''}"
      onclick={() => { activeTab = 'upload'; resetUpload(); }}
    >
      📤 Upload & Store Document
    </button>
    <button 
      class="tab {activeTab === 'verify' ? 'active' : ''}"
      onclick={() => { activeTab = 'verify'; resetVerify(); }}
    >
      🔍 Verify Document
    </button>
  </div>
  
  <!-- Upload Tab -->
  {#if activeTab === 'upload'}
    <div class="card">
      <h2>Upload Dokumen</h2>
      <p class="info">Dokumen akan di-hash dengan SHA-256, dan hash-nya akan disimpan ke blockchain.</p>
      
      <div class="form-group">
        <label for="upload-file">Pilih File:</label>
        <input 
          id="upload-file"
          type="file" 
          onchange={onUploadFileChange}
          accept=".pdf,.docx,.txt,.jpg,.png"
        />
      </div>
      
      {#if uploadFile}
        <div class="file-info">
          <strong>File terpilih:</strong> {uploadFile.name} ({(uploadFile.size / 1024).toFixed(2)} KB)
        </div>
      {/if}
      
      <button 
        class="btn-primary" 
        onclick={handleUpload}
        disabled={!uploadFile || uploadLoading}
      >
        {uploadLoading ? '⏳ Memproses...' : '📤 Upload & Store ke Blockchain'}
      </button>
      
      {#if uploadError}
        <div class="error">
          <strong>Error:</strong> {uploadError}
        </div>
      {/if}
      
      {#if uploadResult}
        <div class="success">
          <h3>✅ Hash Berhasil Disimpan!</h3>
          <div class="result-details">
            <div><strong>Filename:</strong> {uploadResult.filename}</div>
            <div><strong>Document ID:</strong> <code>{uploadResult.docId}</code></div>
            <div><strong>SHA-256 Hash:</strong> <code class="hash">{uploadResult.hash}</code></div>
            <div><strong>Transaction Hash:</strong> <code>{uploadResult.txHash}</code></div>
          </div>
          <p class="warning">⚠️ Simpan Document ID ini! Diperlukan untuk verifikasi nanti.</p>
        </div>
      {/if}
    </div>
  {/if}
  
  <!-- Verify Tab -->
  {#if activeTab === 'verify'}
    <div class="card">
      <h2>Verifikasi Dokumen</h2>
      <p class="info">Upload dokumen dan masukkan Document ID untuk memverifikasi keasliannya.</p>
      
      <div class="form-group">
        <label for="verify-docid">Document ID:</label>
        <input 
          id="verify-docid"
          type="text" 
          placeholder="Masukkan Document ID yang didapat saat upload"
          bind:value={verifyDocId}
        />
      </div>
      
      <div class="form-group">
        <label for="verify-file">Pilih File yang Akan Diverifikasi:</label>
        <input 
          id="verify-file"
          type="file" 
          onchange={onVerifyFileChange}
        />
      </div>
      
      {#if verifyFile}
        <div class="file-info">
          <strong>File terpilih:</strong> {verifyFile.name}
        </div>
      {/if}
      
      <button 
        class="btn-primary" 
        onclick={handleVerify}
        disabled={!verifyFile || !verifyDocId || verifyLoading}
      >
        {verifyLoading ? '⏳ Memverifikasi...' : '🔍 Verifikasi Dokumen'}
      </button>
      
      {#if verifyError}
        <div class="error">
          <strong>Error:</strong> {verifyError}
        </div>
      {/if}
      
      {#if verifyResult}
        <div class="result {verifyResult.isValid ? 'success' : 'error'}">
          <h3>{verifyResult.message}</h3>
          <div class="result-details">
            <div><strong>Hash dokumen yang diupload:</strong> <code class="hash">{verifyResult.currentHash}</code></div>
            <div><strong>Hash yang tersimpan di blockchain:</strong> <code class="hash">{verifyResult.storedHash}</code></div>
            {#if verifyResult.timestamp}
              <div><strong>Waktu penyimpanan:</strong> {new Date(verifyResult.timestamp).toLocaleString()}</div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  {/if}
  
  <footer>
    <hr />
    <p>Powered by SHA-256 & Blockchain | Prototype untuk keperluan penelitian</p>
  </footer>
</div>

<style>
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  h1 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #666;
    margin-bottom: 2rem;
  }
  
  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #ddd;
  }
  
  .tab {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: #666;
    transition: all 0.3s;
  }
  
  .tab:hover {
    color: #333;
  }
  
  .tab.active {
    color: #3b82f6;
    border-bottom: 2px solid #3b82f6;
  }
  
  .card {
    background: #f9fafb;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
  
  input[type="file"],
  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  input[type="text"] {
    font-family: monospace;
  }
  
  .file-info {
    background: #e5e7eb;
    padding: 0.5rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }
  
  .btn-primary {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .btn-primary:hover:not(:disabled) {
    background: #2563eb;
  }
  
  .btn-primary:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
  
  .success {
    background: #d1fae5;
    border: 1px solid #10b981;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
  }
  
  .error {
    background: #fee2e2;
    border: 1px solid #ef4444;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
    color: #b91c1c;
  }
  
  .result-details {
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
  
  .result-details div {
    margin: 0.5rem 0;
    word-break: break-all;
  }
  
  code {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 0.125rem 0.25rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
  }
  
  code.hash {
    font-size: 0.7rem;
    word-break: break-all;
    display: inline-block;
  }
  
  .warning {
    color: #d97706;
    margin-top: 0.75rem;
    font-weight: 500;
  }
  
  .info {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
  
  footer {
    margin-top: 2rem;
    text-align: center;
    color: #9ca3af;
    font-size: 0.75rem;
  }
  
  hr {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 1rem 0;
  }
</style>