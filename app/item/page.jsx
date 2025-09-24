import Rating from "@/app/components/Rating";
import Price from "@/app/components/Price";
import ViewItem from "@/app/components/ViewItem";
import Carousel from "@/app/components/Carousel";
import "./zoom.css";

export default function ItemDetails() {
    const cards = [
        { title: "Card 1", description: "Descrição do card 1" },
        { title: "Card 2", description: "Descrição do card 2" },
        { title: "Card 3", description: "Descrição do card 3" },
        { title: "Card 5", description: "Descrição do card 4" },
        { title: "Card 6", description: "Descrição do card 4" },
        { title: "Card 7", description: "Descrição do card 4" },
        { title: "Card 8", description: "Descrição do card 4" },
        { title: "Card 9", description: "Descrição do card 4" },

    ];

    return (
        <div className="flex flex-col bg-white mx-50 my-10 ">
            <div className=" bg-white flex p-8">
                <ViewItem />
                <div className="p-10 flex flex-col gap-5">
                    <h2 className="text-2xl font-medium">Relógio Masculino Couro Preto Saint Germain Murray Full Black 40mm Fundo Preto</h2>
                    <div>
                        <Rating value={4} />
                    </div>
                    <Price
                        originalPrice={250}
                        currentPrice={100}
                        installmentsAmount={12}
                        installmentsValue={15}
                    />
                </div>
            </div>
            <button className="cursor-pointer bg-[#ba4949] w-50 py-3 text-white ml-10">Adicionar ao carrinho</button>
            <div className="bg-white relative -top-[80x]">
                <Carousel title={"Produtos similares"} items={cards} />
            </div>
        </div>
    );
}