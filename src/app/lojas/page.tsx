'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface Loja {
  id?: string;
  instagram: string;
  link_instagram: string;
  email: string;
  senha: string;
  responsavel: string;
}

export default function Lojas() {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Loja>({ instagram: '', link_instagram: '', email: '', senha: '', responsavel: '' });

  useEffect(() => {
    const fetchLojas = async () => {
      const { data, error } = await supabase.from('lojas').select('*');
      if (error) console.error(error);
      else setLojas(data || []);
    };
    fetchLojas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.instagram && form.link_instagram) {
      if (editingIndex !== null) {
        const { error } = await supabase
          .from('lojas')
          .update({
            instagram: form.instagram,
            link_instagram: form.link_instagram,
            email: form.email,
            senha: form.senha,
            responsavel: form.responsavel
          })
          .eq('id', lojas[editingIndex].id);
        if (error) console.error(error);
        else {
          const updatedLojas = [...lojas];
          updatedLojas[editingIndex] = { ...form, id: lojas[editingIndex].id };
          setLojas(updatedLojas);
        }
      } else {
        const { data, error } = await supabase
          .from('lojas')
          .insert({
            instagram: form.instagram,
            link_instagram: form.link_instagram,
            email: form.email,
            senha: form.senha,
            responsavel: form.responsavel
          })
          .select();
        if (error) console.error(error);
        else if (data) {
          setLojas([...lojas, data[0]]);
        }
      }
      setForm({ instagram: '', link_instagram: '', email: '', senha: '', responsavel: '' });
      setEditingIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    setForm(lojas[index]);
    setEditingIndex(index);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gradient-to-r from-gray-900 to-black text-white py-8 border-b border-gray-700 shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-red-500/10 blur-xl"></div>
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
            Real <span className="text-red-400">Calçados</span>
          </h1>
          <p className="text-lg text-gray-300 font-medium drop-shadow">Gestão Estratégica de Marketing Digital</p>
          <p className="text-sm text-gray-400 mt-1 drop-shadow">Organização e Crescimento para Redes de Lojas</p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-4 drop-shadow-lg">Painel de Gestão de Lojas</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ferramenta premium para organizar e gerenciar os perfis de Instagram das suas lojas com eficiência e profissionalismo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">{editingIndex !== null ? 'Editar Loja' : 'Cadastrar Nova Loja'}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1">Instagram (@handle)</label>
              <input
                type="text"
                placeholder="Ex: @realcalcados_loja1"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Link do Instagram</label>
              <input
                type="url"
                placeholder="https://www.instagram.com/realcalcados_loja1"
                value={form.link_instagram}
                onChange={(e) => setForm({ ...form, link_instagram: e.target.value })}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">E-mail (opcional)</label>
              <input
                type="email"
                placeholder="contato@loja.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Senha (opcional)</label>
              <input
                type="password"
                placeholder="Senha de acesso"
                value={form.senha}
                onChange={(e) => setForm({ ...form, senha: e.target.value })}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-1">Nome do Responsável (opcional)</label>
              <input
                type="text"
                placeholder="Nome completo"
                value={form.responsavel}
                onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/50"
              />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/50">
            {editingIndex !== null ? 'Atualizar' : 'Cadastrar'}
          </button>
        </form>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Lojas Cadastradas</h2>
          {lojas.length === 0 ? (
            <p className="text-gray-400">Nenhuma loja cadastrada ainda.</p>
          ) : (
            <div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-3 text-gray-300">Instagram</th>
                      <th className="p-3 text-gray-300">Link</th>
                      <th className="p-3 text-gray-300">E-mail</th>
                      <th className="p-3 text-gray-300">Senha</th>
                      <th className="p-3 text-gray-300">Responsável</th>
                      <th className="p-3 text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lojas.map((loja, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                        <td className="p-3 text-white">{loja.instagram}</td>
                        <td className="p-3">
                          <a href={loja.link_instagram} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                            Ver Perfil
                          </a>
                        </td>
                        <td className="p-3">{loja.email ? "✅" : "❌"}</td>
                        <td className="p-3">{loja.senha ? "✅" : "❌"}</td>
                        <td className="p-3 text-white">{loja.responsavel || '—'}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700 shadow-md hover:shadow-yellow-500/50"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 shadow-md hover:shadow-red-500/50"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile Cards */}
              <div className="md:hidden grid grid-cols-1 gap-4">
              {lojas.map((loja, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700 hover:shadow-3xl hover:scale-105 transition-all duration-300">
                  <div className="flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-400 mb-4 truncate" title={loja.instagram}>{loja.instagram}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-400">🔗</span>
                        <span className="text-gray-400 font-medium">Link:</span>
                        <a href={loja.link_instagram} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                          Ver Perfil
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✉️</span>
                        <span className="text-gray-400 font-medium">E-mail:</span>
                        <span className="text-white">{loja.email || 'Não informado'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-400">🔒</span>
                        <span className="text-gray-400 font-medium">Senha:</span>
                        <span className="text-white">{loja.senha ? 'Definida' : 'Não definida'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400">👤</span>
                        <span className="text-gray-400 font-medium">Responsável:</span>
                        <span className="text-white">{loja.responsavel || 'Não informado'}</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => handleEdit(index)}
                        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-2 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition shadow-lg hover:shadow-yellow-500/50 font-medium"
                      >
                        Editar Loja
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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