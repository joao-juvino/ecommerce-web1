import Image from "next/image";

export default function ViewItemChange({url, currentImage, setCurrentImage}) {
    function handleChangeImage(imageURL) {
        setCurrentImage(imageURL);
    }

    return (
        <div
            style={{
                borderColor: currentImage === url ? '#ba4949' : '#d1d5db',
            }}
            className="cursor-pointer relative w-15 h-15 rounded-sm border-1"
            onMouseOver={() => handleChangeImage(url)}
        >
            <Image
                src={url}
                alt="Relógio"
                fill
                className="object-cover rounded-lg"
            />
        </div>
    );
}