"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createStore } from '@/app/services/lojaService';

export default function CadastrarLojaPage() {
  const [formData, setFormData] = useState({
    nome_fantasia: '',
    cnpj: '',
    cep: '',
    descricao: ''
  });
  const router = useRouter();

  // Esta função agora será usada nos inputs abaixo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createStore(formData);
      alert('Solicitação de criação de loja enviada com sucesso!');
      router.push('/minha-conta');
    } catch { // Variável _err removida
      alert('Não foi possível criar a loja. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Cadastrar minha Loja</h1>
      <p className="mb-6 text-gray-600">Preencha os dados abaixo para solicitar a criação da sua loja. Você deve estar logado como vendedor.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome_fantasia" className="block text-sm font-medium text-gray-700">Nome Fantasia</label>
          <input
            id="nome_fantasia"
            type="text"
            name="nome_fantasia"
            value={formData.nome_fantasia}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
         <div>
          <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">CNPJ</label>
          <input
            id="cnpj"
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="cep" className="block text-sm font-medium text-gray-700">CEP</label>
          <input
            id="cep"
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição (Opcional)</label>
          <textarea
            id="descricao"
            name="descricao"
            rows={3}
            value={formData.descricao}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Criar Loja
        </button>
      </form>
    </div>
  );
}