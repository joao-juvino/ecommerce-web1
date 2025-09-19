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
