import Carousel from "@/app/components/Carousel";
import apiClient from "@/app/services/api";

// Interface para o tipo de dados do produto
interface Product {
  id: number;
  nome: string;
  preco: string;
  imagens: { url_imagem: string }[];
  preco_original?: string; // Propriedade opcional para o preço de oferta
}

/**
 * Busca a lista de produtos da API.
 * @returns Uma promessa que resolve para um array de produtos.
 */
async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get('/api/v1/produtos');
    return response.data;
  } catch (error) {
    console.error("Falha ao buscar produtos:", error);
    return []; // Retorna um array vazio em caso de erro para não quebrar a página
  }
}

/**
 * Função auxiliar para embaralhar um array.
 * @param array O array de produtos a ser embaralhado.
 * @returns Um novo array com os produtos em ordem aleatória.
 */
function shuffleArray(array: Product[]): Product[] {
  const newArray = [...array]; // Cria uma cópia para não modificar o array original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default async function Home() {
  // 1. Busca todos os produtos uma única vez
  const allProducts = await getProducts();
  
  // 2. Embaralha a lista para criar variedade
  const shuffledProducts = shuffleArray(allProducts);

  // 3. "Fatia" o array para criar listas distintas para cada carrossel
  const dailyDeals = shuffledProducts.slice(0, 10);
  const bestSellers = shuffledProducts.slice(10, 20);
  const newArrivals = shuffledProducts.slice(20, 30);

  return (
    <section>
      {/* Correção de estilo: trocado px-50 (inválido) por px-8 (padrão Tailwind) */}
      <div className="py-10 px-8 bg-[#ebebeb] space-y-10">
        {/* 4. Passa as listas separadas para cada componente Carousel */}
        <Carousel title={"Ofertas do dia"} items={dailyDeals} />
        <Carousel title={"Mais vendidos"} items={bestSellers} />
        <Carousel title={"Novidades"} items={newArrivals} />
      </div>
    </section>
  );
}