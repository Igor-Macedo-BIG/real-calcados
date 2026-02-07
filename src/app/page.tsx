'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Loja {
  id?: string;
  instagram: string;
  link_instagram: string;
  email: string;
  senha: string;
  responsavel: string;
}

export default function Home() {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Loja>({ instagram: '', link_instagram: '', email: '', senha: '', responsavel: '' });
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false);
    }
  };

  const handleEdit = (index: number) => {
    setForm(lojas[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index: number) => {
    const loja = lojas[index];
    if (loja.id) {
      const { error } = await supabase.from('lojas').delete().eq('id', loja.id);
      if (error) console.error(error);
      else {
        setLojas(lojas.filter((_, i) => i !== index));
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gradient-to-r from-gray-900 to-black text-white py-4 md:py-8 border-b border-gray-700 shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-red-500/10 blur-xl"></div>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent mb-1 md:mb-2 drop-shadow-lg">
            Real <span className="text-red-400">Calçados</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-300 font-medium drop-shadow">Gestão Estratégica de Marketing Digital</p>
          <p className="text-xs md:text-sm text-gray-400 mt-1 drop-shadow">Organização e Crescimento para Redes de Lojas</p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-blue-400 mb-2 md:mb-4 drop-shadow-lg">Painel de Gestão de Lojas</h1>
          <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto">
            Ferramenta premium para organizar e gerenciar os perfis de Instagram das suas lojas com eficiência e profissionalismo.
          </p>
        </div>

        <div className="bg-gray-900 p-4 md:p-6 rounded-lg mb-4 md:mb-8">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowForm(!showForm)}>
            <h2 className="text-lg md:text-2xl font-semibold text-white">{editingIndex !== null ? 'Editar Loja' : 'Cadastrar Nova Loja'}</h2>
            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full shadow-lg hover:shadow-blue-500/50 text-lg font-bold transition">
              {showForm ? '−' : '+'}
            </button>
          </div>
          {showForm && (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-gray-300 mb-1 text-sm md:text-base">Instagram (@handle)</label>
                  <input
                    type="text"
                    placeholder="Ex: @realcalcados_loja1"
                    value={form.instagram}
                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/50 text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm md:text-base">Link do Instagram</label>
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/realcalcados_loja1"
                    value={form.link_instagram}
                    onChange={(e) => setForm({ ...form, link_instagram: e.target.value })}
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/50 text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm md:text-base">E-mail (opcional)</label>
                  <input
                    type="email"
                    placeholder="contato@loja.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/50 text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm md:text-base">Senha (opcional)</label>
                  <input
                    type="password"
                    placeholder="Senha de acesso"
                    value={form.senha}
                    onChange={(e) => setForm({ ...form, senha: e.target.value })}
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/50 text-sm md:text-base"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-1 text-sm md:text-base">Nome do Responsável (opcional)</label>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={form.responsavel}
                    onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/50 text-sm md:text-base"
                  />
                </div>
              </div>
              <button type="submit" className="mt-3 md:mt-4 bg-blue-600 text-white px-4 md:px-6 py-2 rounded hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/50 text-sm md:text-base">
                {editingIndex !== null ? 'Atualizar' : 'Cadastrar'}
              </button>
            </form>
          )}
        </div>

        <div className="bg-gray-900 p-4 md:p-6 rounded-lg">
          <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4 text-white">Lojas Cadastradas</h2>
          {lojas.length === 0 ? (
            <p className="text-gray-400 text-sm md:text-base">Nenhuma loja cadastrada ainda.</p>
          ) : (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm md:text-base">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-2 md:p-3 text-gray-300">Instagram</th>
                      <th className="p-2 md:p-3 text-gray-300">Link</th>
                      <th className="p-2 md:p-3 text-gray-300">E-mail</th>
                      <th className="p-2 md:p-3 text-gray-300">Senha</th>
                      <th className="p-2 md:p-3 text-gray-300">Responsável</th>
                      <th className="p-2 md:p-3 text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lojas.map((loja, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                        <td className="p-2 md:p-3 text-white">{loja.instagram}</td>
                        <td className="p-2 md:p-3">
                          <a href={`https://m.instagram.com/${loja.instagram.slice(1)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm md:text-base">
                            Ver Perfil
                          </a>
                        </td>
                        <td className="p-2 md:p-3">{loja.email ? "✅" : "❌"}</td>
                        <td className="p-2 md:p-3">{loja.senha ? "✅" : "❌"}</td>
                        <td className="p-2 md:p-3 text-white">{loja.responsavel || '—'}</td>
                        <td className="p-2 md:p-3 flex gap-1 md:gap-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-yellow-600 text-white px-2 md:px-4 py-1 rounded hover:bg-yellow-700 shadow-md hover:shadow-yellow-500/50 text-xs md:text-sm"
                          >
                            Editar
                          </button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-black text-white py-4 md:py-8 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm md:text-base">&copy; 2026 Real Calçados. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
