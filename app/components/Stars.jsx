import { Star } from "lucide-react";

export default function Stars({value = 4.0, max = 5}) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: max }, (_, i) => (
                <Star
                    key={i}
                    className={`cursor-pointer w-5 h-5 ${i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                />
            ))}
        </div>
    );
}