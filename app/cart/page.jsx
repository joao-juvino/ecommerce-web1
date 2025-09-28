"use client";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Chart() {
    const router = useRouter();
    const { items, addItem, removeItem, getTotal, getAmount } = useCart();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            router.push("/login");
        }
    }, [router]);
    

    return (
        <div className="bg-white mx-10 my-10 p-10">
            <div className="flex justify-between">
                <h2 className="text-2xl mb-5">Carrinho de Compras</h2>
                <button className="cursor-pointer bg-[#ba4949] text-white w-40 h-12 ">Fechar pedido</button>
            </div>
            <div className="flex flex-col">
                {items.map(item => (
                    <div key={item.id} className="flex gap-5 border-t-1 border-gray-300 my-2">
                        <div className="relative w-50 h-50">
                            <Image
                                src={item.imgs[0]}
                                alt="Relógio"
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                        <div className="grow-1 py-5 flex flex-col gap-1">
                            <h3 className="text-xl text-gray-800">{item.nome}</h3>
                            <span className="text-green-500 text-sm mb-1">Em estoque</span>
                            <div className="flex gap-2">
                                <input className="cursor-pointer" type="checkbox" name="gift" id="gift" />
                                <label className="text-gray-700 text-sm">Este pedido é para presente</label>
                            </div>
                            <div className="text-gray-700 flex gap-3 border-1 border-[#ba4949] w-fit px-3 py-1 rounded-full mt-3">
                                <Minus onClick={() => removeItem(item.id)} className="cursor-pointer" />
                                <span>{item.amount}</span>
                                <Plus onClick={() => addItem(item)} className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex flex-col items-end py-5">
                            <h3 className="text-xl font-bold mb-2">R${item.preco}</h3>
                            <p>ou em até {item.parcelas}x de</p>
                            <p>R$ {item.valor_parcela} sem juros</p>
                        </div>
                    </div>
                ))}
                <div className="flex self-end">
                    <span className="text-lg text-gray-700">Subtotal ({getAmount()} produtos): <span className="font-bold">R$ {getTotal()}</span></span>
                </div>
            </div>
        </div>
    );
}
