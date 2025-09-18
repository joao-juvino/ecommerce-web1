import { ShoppingCart, Store } from "lucide-react";
import Carousel from "@/app/components/Carousel";

export default function Home() {
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
    <>
      <header className="w-full bg-[#ba4949]">
        <nav className="flex py-2 px-100 justify-center items-center gap-10">
          <div className="h-20 w-20 flex justify-center items-center text-white">
            <Store className="h-15 w-15" strokeWidth={2} />
          </div>
          <input className="grow-1 bg-white px-7 py-3" type="search" placeholder="pesquisar"/>
          <ul className="flex gap-10">
            <li className="flex items-center text-white"><ShoppingCart className="w-10 h-10" /></li>
            <li className="bg-white text-gray-800  py-3 px-6">Login</li>
          </ul>
        </nav>
      </header>
      <section>
        <div className="py-10 px-50 bg-[#ebebeb]">
          <Carousel items={cards} />
          <Carousel items={cards} />
          <Carousel items={cards} />
        </div>
      </section>
    </>
  );
}
