import { Star } from "lucide-react";

export default function Rating({ value = 0, max = 5, amount = 10 }) {
  return (
    <div className="flex items-center gap-3">
      <div className= "text-sm text-gray-500">{Number(value).toFixed(1)}</div>
      <div className="flex gap-1">
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            className={`cursor-pointer w-5 h-5 ${
              i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="text-sm text-gray-500">({amount})</div>
    </div>
  );
}
