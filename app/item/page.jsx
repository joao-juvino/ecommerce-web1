import Rating from "@/app/components/Rating";
import ImageMagnifier from "@/app/components/ProductZoomImage";

export default function ViewItem() {
    return (
        <div className=" bg-white mx-100 mt-10 flex">
            <div className="h-100 w-100">
                <div className="relative w-full h-100">
                    <ImageMagnifier
                        src="/img/watch.png" 
                        width={400}          
                        height={400}         
                        zoom={2}
                    />
                </div>
            </div>

            <div className="p-10 flex flex-col gap-5">
                <h2 className="text-2xl font-medium">Relógio Masculino Couro Preto Saint Germain Murray Full Black 40mm Fundo Preto</h2>
                <div>
                    <Rating value={4} />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="line-through text-sm text-gray-500">
                        R$ 250
                    </span>
                    <p className="flex items-center gap-3 text-4xl font-light">R$ 100 <span className="text-sm font-medium text-green-500">60% OFF</span></p>
                    <p className="text-sm font-medium">12x R$15 no cartão</p>
                </div>
            </div>
        </div>
    );
}