import Image from "next/image";
import Link from "next/link";
import Price from "@/app/components/Price";

export default function Card() {
    return (
        <Link href="/item">
            <div className="cursor-pointer flex flex-col items-center pt-5 py-20 bg-white text-black">
                <div className="h-50 w-50">
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
            </div>
        </Link>
    );
}