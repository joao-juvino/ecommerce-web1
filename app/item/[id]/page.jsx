"use client";
import { useEffect, useState } from "react";
import Rating from "@/app/components/Rating";
import Price from "@/app/components/Price";
import ViewItem from "@/app/components/ViewItem";
import Carousel from "@/app/components/Carousel";
import { useParams } from "next/navigation";
import { getNItems } from "@/utils/functions";
import items from "@/mock/items.json";
import "./zoom.css";

export default function ItemDetails() {
    const params = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (!params?.id) return;

        import("@/mock/items.json").then((module) => {
            const items = module.default;
            const foundItem = items.find((i) => i.id === Number(params.id));
            setItem(foundItem);
        });
    }, [params.id]);

    if (!item) return <p>Carregando...</p>;

    return (
        <div className="flex flex-col bg-white mx-50 my-10 ">
            <div className=" bg-white flex p-8">
                <ViewItem {...item} />
                <div className="p-10 flex flex-col gap-5">
                    <h2 className="text-2xl font-medium">{item ? item.nome : "loading"}</h2>
                    <div>
                        <Rating value={item.media_avaliacoes} amount={item.avaliacoes} />
                    </div>
                    <Price
                        originalPrice={item.preco_original}
                        currentPrice={item.preco}
                        installmentsAmount={item.parcelas}
                        installmentsValue={item.valor_parcela}
                    />
                </div>
            </div>
            <button className="cursor-pointer bg-[#ba4949] w-50 py-3 text-white ml-10">Adicionar ao carrinho</button>
            <div className="bg-white relative -top-[80x]">
                <Carousel title={"Produtos similares"} items={getNItems(items)} />
            </div>
        </div>
    );
}