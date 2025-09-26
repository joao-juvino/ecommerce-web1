export default function BasicFilter({ title, items }) {
    return (
        <div>
            <h2 className="font-bold mb-2">{title}</h2>
            {items && items.map((item, key) => (
                <div key={key} className="flex gap-2">
                    <input className="cursor-pointer" type="checkbox" name={item.name} id={item.name} />
                    <label className="text-gray-700">{item.label}</label>
                </div>
            ))}
        </div>
    );
}