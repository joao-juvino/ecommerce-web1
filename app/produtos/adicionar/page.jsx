// app/produtos/adicionar/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCategories, getTags, createProduct, uploadProductImages } from '@/app/services/produtoService';

export default function AdicionarProdutoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estoque: '',
    peso: '',
    altura: '',
    largura: '',
    comprimento: '',
    categoria_id: '',
    tags_ids: [],
  });
  const [imageFiles, setImageFiles] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const [cats, tgs] = await Promise.all([getCategories(), getTags()]);
      setCategories(cats);
      setTags(tgs);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    const tagId = parseInt(value, 10);
    setFormData(prev => {
      const currentTags = prev.tags_ids;
      if (checked) {
        return { ...prev, tags_ids: [...currentTags, tagId] };
      } else {
        return { ...prev, tags_ids: currentTags.filter(id => id !== tagId) };
      }
    });
  };

  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // AQUI ESTÁ A CORREÇÃO: Convertendo os campos para os tipos corretos
    const productPayload = {
      ...formData,
      preco: parseFloat(formData.preco),
      estoque: parseInt(formData.estoque, 10),
      peso: parseFloat(formData.peso),
      altura: parseFloat(formData.altura),
      largura: parseFloat(formData.largura),
      comprimento: parseFloat(formData.comprimento),
      // Se categoria_id for uma string vazia, enviamos null
      categoria_id: formData.categoria_id ? parseInt(formData.categoria_id, 10) : null,
    };

    try {
      // Enviamos o payload corrigido
      const newProduct = await createProduct(productPayload);
      
      if (newProduct && newProduct.id && imageFiles && imageFiles.length > 0) {
        await uploadProductImages(newProduct.id, imageFiles);
      }
      
      alert('Produto criado com sucesso!');
      router.push('/');
      
    } catch (err) {
      setError('Falha ao criar o produto. Verifique se todos os campos estão preenchidos corretamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white rounded-lg shadow-md">
      {/* O JSX do formulário continua o mesmo */}
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome do Produto" className="w-full p-2 border rounded" required />
        <textarea name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Descrição" className="w-full p-2 border rounded" required />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input type="number" step="0.01" name="preco" value={formData.preco} onChange={handleChange} placeholder="Preço (ex: 29.99)" className="p-2 border rounded" required />
          <input type="number" name="estoque" value={formData.estoque} onChange={handleChange} placeholder="Estoque" className="p-2 border rounded" required />
          <input type="number" step="0.01" name="peso" value={formData.peso} onChange={handleChange} placeholder="Peso (kg)" className="p-2 border rounded" required />
          <input type="number" step="0.01" name="altura" value={formData.altura} onChange={handleChange} placeholder="Altura (cm)" className="p-2 border rounded" required />
          <input type="number" step="0.01" name="largura" value={formData.largura} onChange={handleChange} placeholder="Largura (cm)" className="p-2 border rounded" required />
          <input type="number" step="0.01" name="comprimento" value={formData.comprimento} onChange={handleChange} placeholder="Comprimento (cm)" className="p-2 border rounded" required />
        </div>

        <select name="categoria_id" value={formData.categoria_id} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Selecione uma Categoria</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nome}</option>)}
        </select>

        <div>
          <label className="block mb-2 font-medium">Tags</label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {tags.map(tag => (
              <label key={tag.id} className="flex items-center space-x-2">
                <input type="checkbox" value={tag.id} onChange={handleTagChange} />
                <span>{tag.nome}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Imagens do Produto</label>
          <input type="file" multiple onChange={handleImageChange} className="w-full" />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        
        <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-blue-300">
          {isLoading ? 'Salvando...' : 'Salvar Produto'}
        </button>
      </form>
    </div>
  );
}