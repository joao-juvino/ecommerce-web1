export interface Item {
    id: number;
    nome: string;
    preco_original: number;
    preco: number;
    parcelas: number;
    valor_parcela: number;
    avaliacoes: number;
    media_avaliacoes: number;
    imgs: string[];
}

export function getNItems(items: Item[], amount = 10) {
    return items.slice(0, amount);
}