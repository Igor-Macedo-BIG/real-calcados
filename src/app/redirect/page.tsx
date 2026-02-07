'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Redirect() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url) {
      // Pequeno delay para garantir que a página carregue
      setTimeout(() => {
        window.open(decodeURIComponent(url), '_blank', 'noopener,noreferrer');
        setLoading(false);
      }, 500);
    }
  }, [url]);

  if (!url) {
    return <div>URL não fornecida.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        {loading ? (
          <p>Redirecionando...</p>
        ) : (
          <div>
            <p>Se não redirecionou automaticamente, clique abaixo:</p>
            <button
              onClick={() => window.open(decodeURIComponent(url), '_blank', 'noopener,noreferrer')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Abrir no Navegador
            </button>
          </div>
        )}
      </div>
    </div>
  );
}