import Stars from "@/app/components/Stars";
import RangeSlider from "@/app/components/RangeSlider";
import Card from "@/app/components/Card";

export default function Search(){
    return (
        <div className="flex">
            <div className="w-80 p-5 flex flex-col gap-5 bg-white min-h-dvh">
                <div>
                    <h2 className="font-bold">Elegivél a frete grátis</h2>
                    <div className="flex gap-2">
                        <input type="checkbox" name="freeFreight" id="freeFreight" />
                        <label>Frete grátis</label>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="font-bold">Gênero</h2>
                    <div className="flex gap-2">
                        <input type="checkbox" name="male" id="male" />
                        <label>Masculino</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="female" id="female" />
                        <label>Feminino</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="boy" id="boy" />
                        <label>Menino</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="girl" id="girl" />
                        <label>Menina</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="unisex" id="unisex" />
                        <label>Unissex</label>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold">Avaliações</h2>
                    <div className="flex gap-2 cursor-pointer">
                        <Stars/>
                        <label>Positivos</label>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold">Preço</h2>
                    <p>R$10 - R$20.500</p>
                    <RangeSlider />
                </div>
                <div>
                    <h2 className="font-bold">Disponibilidade</h2>
                    <div className="flex gap-2">
                        <input type="checkbox" name="stock" id="stock" />
                        <label>Exibir item sem estoque</label>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <h2 className="text-2xl font-bold mb-5 text-gray-900">Resultados:</h2>
                <div className="flex flex-wrap justify-center gap-5">
                    <Card showButton={true}/>
                    <Card showButton={true}/>
                    <Card showButton={true}/>
                    <Card showButton={true}/>
                    <Card showButton={true}/>
                    <Card showButton={true}/>
                    <Card showButton={true}/>
                    <Card showButton={true}/>
                    <Card showButton={true}/>
                    <Card showButton={true}/>
                </div>
            </div>
        </div>
    );
}