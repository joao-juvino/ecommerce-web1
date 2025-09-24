import Rating from "@/app/components/Rating";
import Price from "@/app/components/Price";
import ViewItem from "@/app/components/ViewItem";
import "./zoom.css";
import Image from "next/image";

export default function ItemDetails() {
    return (
        <div>
            <div className=" bg-white mx-50 mt-10 flex p-8">
                <div className="flex flex-col gap-3">
                    <div className="hover:border-[#ba4949] cursor-pointer relative w-15 h-15 rounded-sm border-1 border-gray-300">
                        <Image
                            src="/img/watch.png"
                            alt="Relógio"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div className="hover:border-[#ba4949] cursor-pointer relative w-15 h-15 rounded-sm border-1 border-gray-300">
                        <Image
                            src="/img/watch.png"
                            alt="Relógio"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div className="hover:border-[#ba4949] cursor-pointer relative w-15 h-15 rounded-sm border-1 border-gray-300">
                        <Image
                            src="/img/watch.png"
                            alt="Relógio"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div className="hover:border-[#ba4949] cursor-pointer relative w-15 h-15 rounded-sm border-1 border-gray-300">
                        <Image
                            src="/img/watch.png"
                            alt="Relógio"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>

                <ViewItem/>

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
        </div>
    );
}