"use client";
import { Search, ShoppingCart, Store } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Menu() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            router.push(`/search/${searchTerm}`);
        }
    };
    const { items } = useCart();

    return (
        <header className="w-full bg-[#ba4949]">
            <nav className="flex py-5 px-70 justify-center items-center gap-10">
                <div className="flex justify-center items-center text-white">
                    <Link href="/"><Store className="cursor-pointer h-10 w-10" strokeWidth={2} /></Link>
                </div>
                <div className="flex justify-center items-center">
                    <input className="grow-1 bg-white px-7 py-2" type="search" placeholder="pesquisar" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span onClick={() => handleSearch()} className="bg-white cursor-pointer px-5 py-2 text-gray-500"><Search /></span>
                </div>
                <ul className="flex gap-10">
                    <Link href="/cart">
                        <li className="cursor-pointer flex items-center text-white relative">
                            <ShoppingCart className="w-8 h-8" />
                            <span className="absolute mt-[100%] ml-[100%] font-bold">{items.length}</span>
                        </li>
                    </Link>
                    <Link href="/login">
                        <li className="flex justify-center items-center cursor-pointer bg-white text-gray-800 py-2 px-6">Login</li>
                    </Link>
                </ul>
            </nav>
        </header>
    );
}