"use client";
import Image from "next/image";
import Link from "next/link";
import Price from "@/app/components/Price";
import { useCart } from "@/app/context/CartContext";

export default function Card({ showButton = false }) {
    const { addItem } = useCart();

    function handleAddItemToCart(item){
        addItem(item);
    }

    return (
        <Link href="/item">
            <div
                style={{
                    padding: showButton ? "30px 0px" : "80px 0px",
                }}
                className="cursor-pointer flex flex-col items-center !pt-2 bg-white text-black">
                <div className="h-50 w-50 mx-5">
                    <div className="relative w-full h-50">
                        <Image
                            src="/img/watch.png"
                            alt="Relógio"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
                <p className="mb-1 font-light text-gray-700">Samsumg smart watch</p>
                <Price
                    originalPrice={250}
                    currentPrice={100}
                    installmentsAmount={12}
                    installmentsValue={15}
                />
                {showButton && <button onClick={() => handleAddItemToCart({price: 100, name: "watch", id: 1})} className="cursor-pointer bg-[#ba4949] text-white mt-5 px-6 py-2 rounded-full">Adicionar</button>}
            </div>
        </Link>
    );
}