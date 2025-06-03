'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    const filename = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('uploads').upload(filename, file);
    if (error) return setStatus('Upload failed');

    const { error: dbError } = await supabase.from('media').insert({ url: filename });
    if (dbError) return setStatus('Saved to storage but failed to log in DB');

    setStatus('Upload successful!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Upload Media</h1>
      <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={handleUpload}>Upload</button>
      <p className="mt-2">{status}</p>
    </div>
  );
}
