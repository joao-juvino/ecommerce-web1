import Stars from "@/app/components/Stars";
import RangeSlider from "@/app/components/RangeSlider";
import Card from "@/app/components/Card";
import BasicFilter from "@/app/components/BasicFilter";
import { getNItems } from "@/utils/functions";
import items from "@/mock/items.json";

export default function Search() {
    return (
        <div className="flex">
            <div className="w-80 p-10 flex flex-col gap-5 bg-white h-dvh">
                {/* Filter By  Freight */}
                <BasicFilter
                    title="Elegivél a frete grátis"
                    items={[
                        {name: "freeFreight", label: "Frete grátis"},
                    ]}
                />

                {/* Filter By Gender */}
                <BasicFilter
                    title="Gênero"
                    items={[
                        {name: "male", label: "Masculino"},
                        {name: "female", label: "Feminino"},
                        {name: "boy", label: "Menino"},
                        {name: "girl", label: "Menina"},
                        {name: "unissex", label: "Unissex"},
                    ]}
                />

                {/* Filter By Stars */}
                <div>
                    <h2 className="font-bold mb-2">Avaliações</h2>
                    <div className="flex gap-2 cursor-pointer">
                        <Stars />
                        <label className="text-gray-700">Positivos</label>
                    </div>
                </div>

                {/* Filter By Price */}
                <div>
                    <h2 className="font-bold mb-2">Preço</h2>
                    <p className="text-gray-700">R$10 - R$20.500</p>
                    <RangeSlider />
                </div>

                {/* Filter By Stock */}
                <BasicFilter
                    title="Disponibilidade"
                    items={[
                        {name: "stock", label: "Exibir item sem estoque"},
                    ]}
                />
            </div>
            <div className="p-5">
                <h2 className="text-2xl font-bold mb-5 text-gray-900">Resultados:</h2>
                <div className="flex flex-wrap justify-start gap-5">
                    {getNItems(items).map(item => (
                        <Card key={item.id} {...item} showButton={true}/>
                    ))}
                </div>
            </div>
        </div>
    );
}