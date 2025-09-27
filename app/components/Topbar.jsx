// app/components/Topbar.jsx
"use client";
import { useState } from 'react';
import { ShoppingCart, Store, UserCircle2, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";

export default function Topbar() {
    const { items } = useCart();
    const { isAuthenticated, user, logout, isLoading } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Placeholder para o menu do usuário enquanto carrega, evita o "pulo" no layout
    const userMenuPlaceholder = <div className="h-[40px] w-[200px]" />;

    return (
        <header className="w-full bg-white text-gray-800 shadow-md p-4 flex items-center justify-between z-10">
            {/* Logo e Nome da Loja */}
            <div className="flex items-center">
                <Link href="/" className="flex items-center text-[#ba4949]">
                    <Store className="h-8 w-8 mr-2" strokeWidth={2} />
                    <span className="text-xl font-bold">Ecommerce</span>
                </Link>
            </div>

            {/* Barra de Pesquisa */}
            <div className="flex-1 max-w-lg mx-4">
                <input className="w-full bg-gray-100 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#ba4949]" type="search" placeholder="Pesquisar produtos..." />
            </div>

            {/* Ícones e Menu do Usuário */}
            <div className="flex items-center gap-6">
                <Link href="/carrinho" className="relative text-gray-600 hover:text-[#ba4949]">
                    <ShoppingCart className="w-7 h-7" />
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#ba4949] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{items.length}</span>
                    )}
                </Link>

                {isLoading ? (
                    userMenuPlaceholder
                ) : isAuthenticated && user ? (
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            {/* O nome do usuário agora abre o dropdown */}
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer">
                                <UserCircle2 className="w-8 h-8 text-gray-600" />
                                <span>Olá, {user.nome.split(' ')[0]}</span>
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                    <li>
                                        <Link href="/minha-conta" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <LayoutDashboard className="w-4 h-4 mr-2" /> Minha Conta
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                        {/* AQUI ESTÁ A CORREÇÃO: Botão Sair fora do dropdown e sempre visível */}
                        <button onClick={logout} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 flex items-center gap-2 text-sm">
                            <LogOut className="w-4 h-4" /> Sair
                        </button>
                    </div>
                ) : (
                    <Link href="/login" className="bg-[#ba4949] text-white py-2 px-6 rounded-md hover:bg-opacity-90">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}