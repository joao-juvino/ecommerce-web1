import os
import argparse

# --- Configuração ---
# Pastas e arquivos a serem ignorados na contagem e na visualização
ITENS_A_IGNORAR = {
    'node_modules', '.git', 'build', 'dist', 
    '__pycache__', '.vscode', '.idea', '.DS_Store',
    'package-lock.json', '.npmrc'
}

def gerar_arvore(diretorio_raiz, max_profundidade=4, prefixo="", ignorar=None):
    """
    Gera e imprime uma estrutura de árvore para um diretório, com controle de profundidade.
    """
    if ignorar is None:
        ignorar = ITENS_A_IGNORAR

    # Inicializa os contadores
    contagem = {'arquivos': 0, 'pastas': 0}
    
    # Valida o caminho
    if not os.path.isdir(diretorio_raiz):
        print(f"Erro: O diretório '{diretorio_raiz}' não foi encontrado.")
        return contagem

    # Obtém a lista de itens, filtrando os ignorados
    try:
        itens = sorted([item for item in os.listdir(diretorio_raiz) if item not in ignorar])
    except OSError as e:
        print(f"Erro ao acessar {diretorio_raiz}: {e}")
        return contagem

    for i, nome_item in enumerate(itens):
        caminho_completo = os.path.join(diretorio_raiz, nome_item)
        e_ultimo = (i == len(itens) - 1)
        
        # Conectores da árvore: '└──' para o último item, '├──' para os demais
        conector = "└── " if e_ultimo else "├── "
        
        print(f"{prefixo}{conector}{nome_item}")

        if os.path.isdir(caminho_completo):
            contagem['pastas'] += 1
            # Para a recursão se a profundidade máxima for atingida
            if max_profundidade > 1 or max_profundidade == -1:
                # O prefixo para os filhos muda dependendo se o item atual é o último
                novo_prefixo = prefixo + ("    " if e_ultimo else "│   ")
                nova_contagem = gerar_arvore(
                    caminho_completo,
                    max_profundidade - 1 if max_profundidade != -1 else -1,
                    novo_prefixo,
                    ignorar
                )
                # Acumula as contagens dos subdiretórios
                contagem['arquivos'] += nova_contagem['arquivos']
                contagem['pastas'] += nova_contagem['pastas']
        else:
            contagem['arquivos'] += 1
            
    return contagem

# --- Bloco Principal de Execução ---
if __name__ == "__main__":
    # Usamos argparse para criar uma interface de linha de comando mais robusta
    parser = argparse.ArgumentParser(
        description="Gera uma árvore de diretórios visualmente.",
        formatter_class=argparse.RawTextHelpFormatter # Melhora a formatação da ajuda
    )
    
    parser.add_argument(
        'diretorio', 
        nargs='?', 
        default='.', 
        help="O diretório raiz para começar a análise (padrão: diretório atual)."
    )
    
    parser.add_argument(
        '-d', '--depth', 
        type=int, 
        default=3, 
        help="Profundidade máxima da árvore a ser exibida.\nUse -1 para profundidade ilimitada (pode gerar saídas muito longas)."
    )
    
    args = parser.parse_args()

    print(f"Árvore para: '{os.path.abspath(args.diretorio)}' (Profundidade máx: {args.depth})\n")
    
    # Inicia a geração da árvore e captura a contagem
    contagem_total = gerar_arvore(args.diretorio, max_profundidade=args.depth)
    
    print("\n" + "="*30)
    print(f"Resumo: {contagem_total['pastas']} pastas, {contagem_total['arquivos']} arquivos.")
    print("="*30)