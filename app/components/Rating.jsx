import Stars from "./Stars";

export default function Rating({ value = 0, max = 5, amount = 10 }) {
  return (
    <div className="flex items-center gap-3">
      <div className= "text-sm text-gray-500">{Number(value).toFixed(1)}</div>
      <Stars value={value} max={max}/>
      <div className="text-sm text-gray-500">({amount})</div>
    </div>
  );
}
