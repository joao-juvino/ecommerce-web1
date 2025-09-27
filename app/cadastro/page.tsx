"use client";
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<'cliente' | 'vendedor'>('cliente');
  const { register } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {e.preventDefault(); await register({ nome, email, senha, tipo });};
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Criar Conta</h2>
        <div className="mb-4">
          <label className="block mb-2">Nome Completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border rounded text-black"
            minLength={6}
            required
          />
        </div>
        {/* 3. Novo campo de seleção para o tipo de conta */}
        <div className="mb-4">
          <label className="block mb-2">O que você deseja?</label>
          <select 
            value={tipo}
            onChange={(e) => setTipo(e.target.value as 'cliente' | 'vendedor')}
            className="w-full p-2 border rounded text-black bg-white"
          >
            <option value="cliente">Apenas Comprar</option>
            <option value="vendedor">Quero Vender na Plataforma</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-[#ba4949] text-white p-2 rounded">
          Cadastrar
        </button>
        <p className="mt-4 text-center">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-blue-500">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
}