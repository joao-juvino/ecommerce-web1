import { ShoppingCart, Store } from "lucide-react";
import Link from "next/link";

export default function Menu() {
    return (
        <header className="w-full bg-[#ba4949]">
            <nav className="flex py-2 px-70 justify-center items-center gap-10">
                <div className="h-20 w-20 flex justify-center items-center text-white">
                    <Link href="/"><Store className="cursor-pointer h-15 w-15" strokeWidth={2} /></Link>
                </div>
                <input className="grow-1 bg-white px-7 py-3" type="search" placeholder="pesquisar" />
                <ul className="flex gap-10">
                    <li className="cursor-pointer flex items-center text-white"><ShoppingCart className="w-10 h-10" /></li>
                    <li className="cursor-pointer bg-white text-gray-800  py-3 px-6">Login</li>
                </ul>
            </nav>
        </header>
    );
}