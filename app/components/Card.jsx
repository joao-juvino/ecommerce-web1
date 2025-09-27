"use client";
import Image from "next/image";
import Link from "next/link";
import Price from "@/app/components/Price";
import { useCart } from "@/app/context/CartContext";

export default function Card({ product, showButton = false }) {
    const { addItem } = useCart();
    function handleAddItemToCart(e){  
        e.preventDefault(); 
        addItem(product);
    }
        
    if (!product) {return null;}

    // AQUI ESTÁ A CORREÇÃO
    // 1. Pegamos a URL base da nossa variável de ambiente.
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // 2. Pegamos o caminho relativo da imagem vindo da API.
    const relativeImageUrl = product.imagens && product.imagens.length > 0 
        ? product.imagens[0].url_imagem 
        : "/img/watch.png"; // Usamos a imagem local como placeholder

    // 3. Montamos a URL completa APENAS se a imagem vier do backend.
    // Se for o placeholder local, usamos como está.
    const imageUrl = relativeImageUrl.startsWith('/static') 
        ? `${baseUrl}${relativeImageUrl}` 
        : relativeImageUrl;
    
    return (
        <Link href={`/item/${product.id}`}>
            <div
                style={{
                    padding: showButton ? "30px 0px" : "80px 0px",
                }}
                className="cursor-pointer flex flex-col items-center !pt-2 bg-white text-black h-full">
                <div className="h-50 w-50 mx-5">
                    <div className="relative w-full h-50">
                        <Image
                            src={imageUrl} 
                            alt={product.nome} 
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
                <p className="mb-1 font-light text-gray-700">{product.nome}</p> 
                <Price 
                  currentPrice={product.preco}
                  originalPrice={product.preco_original} // Supondo que você tenha um preço original
                />
                {showButton && <button onClick={handleAddItemToCart} className="cursor-pointer bg-[#ba4949] text-white mt-5 px-6 py-2 rounded-full">Adicionar</button>}
            </div>
        </Link>
    );
}