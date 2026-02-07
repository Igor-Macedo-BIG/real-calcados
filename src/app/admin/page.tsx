'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

interface Loja {
  id?: string;
  instagram: string;
  link_instagram: string;
  email: string;
  senha: string;
  responsavel: string;
}

export default function Admin() {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('adminLoggedIn') !== 'true') {
      router.push('/login');
      return;
    }
    const fetchLojas = async () => {
      const { data, error } = await supabase.from('lojas').select('*');
      if (error) console.error(error);
      else setLojas(data || []);
    };
    fetchLojas();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/login');
  };

  const handleDelete = async (index: number) => {
    const { error } = await supabase.from('lojas').delete().eq('id', lojas[index].id);
    if (error) console.error(error);
    else {
      setLojas(lojas.filter((_, i) => i !== index));
    }
  };

  if (typeof window !== 'undefined' && localStorage.getItem('adminLoggedIn') !== 'true') {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gradient-to-r from-gray-900 to-black text-white py-8 border-b border-gray-700 shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 blur-xl"></div>
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
            Painel <span className="text-red-400">Admin</span>
          </h1>
          <p className="text-lg text-gray-300 font-medium drop-shadow">Acesso Restrito - Real Calçados</p>
          <p className="text-sm text-gray-400 mt-1 drop-shadow">Visualização Completa de Dados Sensíveis</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-400 mb-4 drop-shadow-lg">Painel Administrativo</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Acesso completo a todos os dados das lojas, incluindo informações sensíveis como e-mails e senhas.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-white">Todas as Lojas Cadastradas</h2>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Sair
            </button>
          </div>
          {lojas.length === 0 ? (
            <p className="text-gray-400">Nenhuma loja cadastrada ainda.</p>
          ) : (
            <div className="space-y-4">
              {lojas.map((loja, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-xl transition duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-red-400 mb-2 truncate">{loja.instagram}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400 font-medium">Link:</span>
                          <a href={loja.link_instagram} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 ml-2 underline">
                            {loja.link_instagram}
                          </a>
                        </div>
                        <div>
                          <span className="text-gray-400 font-medium">E-mail:</span>
                          <span className="text-white ml-2">{loja.email || 'Não informado'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-medium">Senha:</span>
                          <span className="text-white ml-2">{loja.senha || 'Não informada'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-medium">Responsável:</span>
                          <span className="text-white ml-2">{loja.responsavel || 'Não informado'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-4">
                      <button
                        onClick={() => handleDelete(index)}
                        className="w-full lg:w-auto bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition shadow-lg hover:shadow-red-500/50 font-medium"
                      >
                        Excluir Loja
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="bg-black text-white py-8 px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p>&copy; 2026 Real Calçados. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}