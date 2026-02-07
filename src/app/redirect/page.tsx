'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function RedirectContent() {
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

export default function Redirect() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando...</div>}>
      <RedirectContent />
    </Suspense>
  );
}