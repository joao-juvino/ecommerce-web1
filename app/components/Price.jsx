export default function Price({ originalPrice, currentPrice, installmentsValue, installmentsAmount }) {
    // 1. Converte os preços para números, garantindo que não sejam undefined.
    const original = parseFloat(originalPrice);
    const current = parseFloat(currentPrice);

    // 2. Calcula o desconto APENAS se houver um preço original válido e maior que o preço atual.
    let discountPercent = 0;
    if (original && current && original > current) {
        discountPercent = Math.round(((original - current) * 100) / original);
    }

    return (
        <div className="flex flex-col gap-1">
            {/* 3. Mostra o preço original riscado APENAS se houver um desconto. */}
            {discountPercent > 0 && (
                <span className="line-through text-sm text-gray-500">
                    R$ {original.toFixed(2).replace('.', ',')}
                </span>
            )}

            <div className="flex items-center gap-3">
                <p className="text-3xl font-light">
                    {/* Garante que o preço atual seja exibido corretamente formatado */}
                    R$ {current ? current.toFixed(2).replace('.', ',') : '0,00'}
                </p>
                {/* 4. Mostra a tag de desconto APENAS se o desconto for maior que zero. */}
                {discountPercent > 0 && (
                    <span className="text-sm font-medium text-green-500 bg-green-100 px-2 py-1 rounded-md">
                        {discountPercent}% OFF
                    </span>
                )}
            </div>

            {/* 5. Mostra as parcelas APENAS se os valores existirem. */}
            {installmentsAmount && installmentsValue && (
                 <p className="text-sm font-medium">
                    {installmentsAmount}x R$ {parseFloat(installmentsValue).toFixed(2).replace('.', ',')} sem juros
                </p>
            )}
        </div>
    );
}