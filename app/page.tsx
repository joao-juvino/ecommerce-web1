import Carousel from "@/app/components/Carousel";
import items from "@/mock/items.json";
import { getNItems } from "@/utils/functions";

export default function Home() {

    return (
        <>
            <section>
                <div className="py-10 px-50 bg-[#ebebeb]">
                    <Carousel title={"Ofertas do dia"} items={getNItems(items)} />
                    <Carousel title={"Ofertas do dia"} items={getNItems(items.reverse())} />
                    <Carousel title={"Ofertas do dia"} items={getNItems(items)} />
                </div>
            </section>
        </>
    );
}
