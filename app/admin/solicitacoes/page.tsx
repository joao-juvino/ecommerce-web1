"use client";

import { useState, useEffect } from 'react';
import { getPendingStores, approveStore, rejectStore } from '@/app/services/lojaService';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Loja {
  id: number;
  nome_fantasia: string;
  cnpj: string;
}

export default function AdminSolicitacoesPage() {
  const [stores, setStores] = useState<Loja[]>([]);
  const [status, setStatus] = useState<'loading' | 'authorized' | 'unauthorized' | 'error'>('loading');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.tipo === 'admin') {
        setStatus('authorized');
        getPendingStores()
          .then(data => setStores(data))
          .catch(() => setStatus('error'));
      } else {
        setStatus('unauthorized');
        router.push('/');
      }
    } else {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setStatus('unauthorized');
        router.push('/login');
      }
    }
  }, [isAuthenticated, user, router]);

  async function handleApprove(storeId: number) {
    if (confirm('Tem certeza que deseja aprovar esta loja?')) {
      try {
        await approveStore(storeId);
        setStores(prevStores => prevStores.filter(store => store.id !== storeId));
        alert('Loja aprovada com sucesso!');
      } catch {
        alert('Falha ao aprovar a loja.');
      }
    }
  }

  async function handleReject(storeId: number) {
    const reason = prompt('Por favor, digite o motivo da rejeição:');
    if (reason) {
      try {
        await rejectStore(storeId, reason);
        setStores(prevStores => prevStores.filter(store => store.id !== storeId));
        alert('Loja rejeitada com sucesso.');
      } catch {
        alert('Falha ao rejeitar a loja.');
      }
    }
  }

  if (status === 'loading') return <div className="p-8 text-center">Verificando acesso...</div>;
  if (status === 'unauthorized') return null;
  if (status === 'error') return <div className="p-8 text-center text-red-500">Falha ao carregar as solicitações.</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Solicitações de Lojas Pendentes</h1>
      {stores.length === 0 ? (
        <p>Nenhuma solicitação pendente no momento.</p>
      ) : (
        <div className="space-y-4">
          {stores.map(store => (
            <div key={store.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{store.nome_fantasia}</p>
                <p className="text-sm text-gray-600">CNPJ: {store.cnpj}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleApprove(store.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => handleReject(store.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Rejeitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}