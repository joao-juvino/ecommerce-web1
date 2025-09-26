"use client";
import { ShoppingCart, Store, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext"; 

export default function Menu() {
    const { items } = useCart();
    const { isAuthenticated, user, logout } = useAuth(); 
    return (
        <header className="w-full bg-[#ba4949]">
            <nav className="flex py-5 px-70 justify-center items-center gap-10">
                <div className="flex justify-center items-center text-white">
                    <Link href="/"><Store className="cursor-pointer h-10 w-10" strokeWidth={2} /></Link>
                </div>
                <input className="grow-1 bg-white px-7 py-2 text-black" type="search" placeholder="pesquisar" />
                <ul className="flex gap-10">
                    <li className="cursor-pointer flex items-center text-white relative">
                        <ShoppingCart className="w-8 h-8" />
                        <span className="absolute mt-[100%] ml-[100%] font-bold">{items.length}</span>
                    </li>
                    {/* 3. Lógica condicional para exibir o menu do usuário */}
                    {isAuthenticated && user ? (
                        <>
                            <li className="flex justify-center items-center cursor-pointer text-white gap-2">
                                <UserCircle2 />
                                <span>Olá, {user.nome.split(' ')[0]}</span> {/* Exibe o primeiro nome do usuário */}
                            </li>
                            <li 
                                onClick={logout} 
                                className="flex justify-center items-center cursor-pointer bg-white text-gray-800 py-2 px-6"
                            >
                                Sair
                            </li>
                        </>
                    ) : (
                        <li className="flex justify-center items-center cursor-pointer bg-white text-gray-800 py-2 px-6">
                            <Link href="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}