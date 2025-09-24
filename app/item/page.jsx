import Rating from "@/app/components/Rating";
import Price from "@/app/components/Price";
import ViewItem from "@/app/components/ViewItem";
import "./zoom.css";

export default function ItemDetails() {
    return (
        <div>
            <div className=" bg-white mx-50 mt-10 flex p-8">
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