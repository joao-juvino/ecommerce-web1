import Rating from "@/app/components/Rating";
import Price from "@/app/components/Price";
import ViewItem from "@/app/components/ViewItem";
import Carousel from "@/app/components/Carousel";
import apiClient from "@/app/services/api";
import "./zoom.css";

async function getProductDetails(id) {
  try {
    const response = await apiClient.get(`/api/v1/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Falha ao buscar o produto ${id}:`, error);
    return null;
  }
}

async function getSimilarProducts() {
    try {
        const response = await apiClient.get('/api/v1/produtos');
        return response.data;
    } catch (error) {
        console.error("Falha ao buscar produtos similares:", error);
        return [];
    }
}


export default async function ItemDetails({ params }) {
    const product = await getProductDetails(params.id);
    const similarProducts = await getSimilarProducts();

    if (!product) {
        return <div className="text-center p-10">Produto não encontrado.</div>;
    }

    return (
        // Recomendo remover mx-50 que não é padrão do Tailwind e usar p-4 ou p-8 no container pai se precisar
        <div className="flex flex-col bg-white my-10 ">
            <div className=" bg-white flex p-8">
                <ViewItem images={product.imagens} />
                <div className="p-10 flex flex-col gap-5">
                    <h2 className="text-2xl font-medium">{product.nome}</h2>
                    
                    {/* AQUI ESTÁ A CORREÇÃO */}
                    {/* 1. Verificamos se existe pelo menos 1 avaliação */}
                    {product.avaliacoes_count > 0 ? (
                        // 2. Passamos os dados dinâmicos da API para o componente
                        <Rating 
                            value={product.avaliacoes_media} 
                            amount={product.avaliacoes_count}
                        />
                    ) : (
                        <div className="text-sm text-gray-500">
                            (Ainda não há avaliações)
                        </div>
                    )}

                    <Price
                        currentPrice={product.preco}
                        originalPrice={product.preco_original}
                    />

                    {/* Botão de adicionar ao carrinho (precisará de lógica de cliente no futuro) */}
                    <button className="cursor-pointer bg-[#ba4949] w-50 py-3 text-white">Adicionar ao carrinho</button>
                </div>
            </div>
            
            <div className="bg-white relative -top-[80px]">
                <Carousel title={"Produtos similares"} items={similarProducts} />
            </div>
        </div>
    );
}