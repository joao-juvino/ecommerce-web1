import Carousel from "@/app/components/Carousel";
import apiClient from "@/app/services/api"; 

interface Product {
  id: number;
  nome: string;
  preco: string;
  imagens: { url_imagem: string }[];
}

async function getProducts() {
  try {
    const response = await apiClient.get<Product[]>('/api/v1/produtos');
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar produtos:", error);
    return []; 
  }
}

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <section>
        <div className="py-10 px-50 bg-[#ebebeb]">
          {/* 5. Passamos a lista de produtos reais para o Carousel */}
          {/* A propriedade 'items' do Carousel agora espera receber os produtos */}
          <Carousel title={"Ofertas do dia"} items={products} />
          <Carousel title={"Mais vendidos"} items={products} />
          <Carousel title={"Novidades"} items={products} />
        </div>
      </section>
    </>
  );
}