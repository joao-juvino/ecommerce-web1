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

export default async function ItemDetails({ params }) {
    const product = await getProductDetails(params.id);
    const similarProductsResponse = await apiClient.get('/api/v1/produtos');
    const similarProducts = similarProductsResponse.data;
    if (!product) {
        return <div className="text-center p-10">Produto não encontrado.</div>;
    }
    return (
        <div className="flex flex-col bg-white mx-50 my-10 ">
            <div className=" bg-white flex p-8">
                {/* 1. Passa as imagens do produto para o componente ViewItem */}
                <ViewItem images={product.imagens} />
                <div className="p-10 flex flex-col gap-5">
                    {/* 2. Exibe o nome do produto vindo da API */}
                    <h2 className="text-2xl font-medium">{product.nome}</h2>
                    <div>
                        {/* A API não tem nota, então deixamos fixo por enquanto */}
                        <Rating value={4} /> 
                    </div>
                    {/* 3. Passa o preço do produto vindo da API */}
                    <Price
                        currentPrice={parseFloat(product.preco)}
                    />
                </div>
            </div>
            {/* 4. O botão de adicionar ao carrinho precisará de um 'client component' no futuro para funcionar */}
            <button className="cursor-pointer bg-[#ba4949] w-50 py-3 text-white ml-10">Adicionar ao carrinho</button>
            <div className="bg-white relative -top-[80x]">
                <Carousel title={"Produtos similares"} items={similarProducts} />
            </div>
        </div>
    );
}