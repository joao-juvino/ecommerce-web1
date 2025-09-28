"use client";
import Carousel from "@/app/components/Carousel";
import items from "@/mock/items.json";
import { getNItems } from "@/utils/functions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            router.push("/login");
        }
    }, [router]);

    return (
        <section>
            <div className="py-10 px-50 bg-[#ebebeb]">
                <Carousel title={"Ofertas do dia"} items={getNItems(items)} />
                <Carousel title={"Ofertas do dia"} items={getNItems([...items].reverse())} />
                <Carousel title={"Ofertas do dia"} items={getNItems(items)} />
            </div>
        </section>
    );
}
