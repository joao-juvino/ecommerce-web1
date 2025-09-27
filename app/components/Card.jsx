"use client";
import Image from "next/image";
import Link from "next/link";
import Price from "@/app/components/Price";
import { useCart } from "@/app/context/CartContext";

export default function Card({ id, nome, preco_original, preco, parcelas, valor_parcela, imgs, showButton = false }) {
    const { addItem } = useCart();

    function handleAddItemToCart(item){
        addItem(item);
    }

    return (
        <Link href={`item/${id}`}>
            <div
                style={{
                    padding: showButton ? "30px 0px" : "80px 0px",
                }}
                className="cursor-pointer flex flex-col items-center !pt-2 bg-white text-black">
                <div className="h-50 w-50 mx-5">
                    <div className="relative w-full h-50">
                        <Image
                            src={imgs[0]}
                            alt="Relógio"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
                <p className="mb-1 font-light text-gray-700">
                    {nome.length > 20 ? nome.slice(0, 20) + "..." : nome}
                </p>
                <Price
                    originalPrice={preco_original}
                    currentPrice={preco}
                    installmentsAmount={parcelas}
                    installmentsValue={valor_parcela}
                />
                {showButton && <button onClick={() => handleAddItemToCart({price: 100, name: "watch", id: 1})} className="cursor-pointer bg-[#ba4949] text-white mt-5 px-6 py-2 rounded-full">Adicionar</button>}
            </div>
        </Link>
    );
}