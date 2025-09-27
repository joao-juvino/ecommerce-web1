// app/components/Sidebar.jsx
"use client";

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { Home, ShoppingCart, PlusCircle, Shield } from 'lucide-react';

export default function Sidebar() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <aside className="w-64 bg-white text-gray-800 p-4 border-r border-gray-200">
        {/* Placeholder */}
      </aside>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <aside className="w-64 bg-white text-gray-800 p-4 border-r border-gray-200">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
              <Home className="w-6 h-6 text-gray-500" />
              <span className="ml-3">Página Inicial</span>
            </Link>
          </li>

          {/* Opções para CLIENTE */}
          {user?.tipo === 'cliente' && (
            <li>
              <Link href="/carrinho" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                <ShoppingCart className="w-6 h-6 text-gray-500" />
                <span className="ml-3">Meu Carrinho</span>
              </Link>
            </li>
          )}

          {/* Opções para VENDEDOR */}
          {user?.tipo === 'vendedor' && (
            <li>
              <Link href="/produtos/adicionar" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                <PlusCircle className="w-6 h-6 text-gray-500" />
                <span className="ml-3">Adicionar Produto</span>
              </Link> {/* <-- CORRIGIDO AQUI */}
            </li>
          )}

          {/* Opções para ADMIN */}
          {user?.tipo === 'admin' && (
            <li>
              <Link href="/admin/solicitacoes" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                <Shield className="w-6 h-6 text-gray-500" />
                <span className="ml-3">Aprovar Lojas</span>
              </Link> {/* <-- E CORRIGIDO AQUI */}
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}