"use client";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react"; // Importa o useMemo
import ViewItemChange from "./ViewItemChange";

export default function ViewItem({ images = [] }) {
    const [currentImage, setCurrentImage] = useState('');
    
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Usamos useMemo para garantir que 'fullUrlImages' só seja recalculado se 'images' mudar.
    const fullUrlImages = useMemo(() => {
        return images.map(img => ({
            ...img,
            url_imagem: img.url_imagem.startsWith('/static') ? `${baseUrl}${img.url_imagem}` : img.url_imagem
        }));
    }, [images, baseUrl]);

    useEffect(() => {
      if (fullUrlImages && fullUrlImages.length > 0) {
        setCurrentImage(fullUrlImages[0].url_imagem);
      } else {
        setCurrentImage("/img/watch.png");
      }
    }, [fullUrlImages]); // Agora a dependência está correta e segura.


    function handleZoom(event) {
        // ... a lógica do zoom continua a mesma
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const x = ((event.clientX - rect.left) / width) * 100;
        const y = ((event.clientY - rect.top) / height) * 100;
        element.style.setProperty("--zoom-x", `${x}%`);
        element.style.setProperty("--zoom-y", `${y}%`);
        element.style.setProperty("--display", "block");
    }

    function handleRemoveZoom(event) {
        // ... a lógica do zoom continua a mesma
        const element = event.currentTarget;
        element.style.setProperty("--display", "none");
    }
    
    return (
        <div className="flex">
            <div className="flex flex-col gap-3">
                {fullUrlImages.map((image) => (
                    <ViewItemChange
                        key={image.id} 
                        url={image.url_imagem}
                        currentImage={currentImage}
                        setCurrentImage={setCurrentImage}
                    />
                ))}
            </div>
            <div>
                <div
                    id="zoom"
                    className="relative cursor-pointer"
                    style={{ "--url": `url(${currentImage})` }}
                    onMouseMove={handleZoom}
                    onMouseOut={handleRemoveZoom}
                >
                    <Image
                        key={currentImage}
                        src={currentImage}
                        width={600}
                        height={600}
                        alt="imagem do item"
                    />
                </div>
            </div>
        </div>
    );
}