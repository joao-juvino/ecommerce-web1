export default function Price({originalPrice, currentPrice, installmentsValue, installmentsAmount}) {
    return (
        <div className="flex flex-col gap-1">
            <span className="line-through text-sm text-gray-500">
                R$ {originalPrice}
            </span>
            <p className="flex items-center gap-3 text-3xl font-light">R$ {currentPrice} <span className="text-sm font-medium text-green-500">{parseInt((originalPrice - currentPrice) * 100 / originalPrice)}% OFF</span></p>
            <p className="text-sm font-medium">{installmentsAmount}x R${installmentsValue} sem juros</p>
        </div>
    );
}