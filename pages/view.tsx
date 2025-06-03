'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ViewPage() {
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  const fetchRandomMedia = async () => {
    const { data, error } = await supabase.from('media').select('*');
    if (error || !data.length) return;
    const randomItem = data[Math.floor(Math.random() * data.length)];
    const { data: signedUrlData } = await supabase.storage.from('uploads').createSignedUrl(randomItem.url, 60);
    setMediaUrl(signedUrlData?.signedUrl || null);
  };

  useEffect(() => {
    fetchRandomMedia();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Random Viewer</h1>
      {mediaUrl && mediaUrl.endsWith('.mp4') ? (
        <video controls src={mediaUrl} className="max-w-full" />
      ) : (
        <img src={mediaUrl || ''} alt="Uploaded media" className="max-w-full" />
      )}
      <button className="bg-gray-800 text-white px-4 py-2 mt-4" onClick={fetchRandomMedia}>Next</button>
    </div>
  );
}
