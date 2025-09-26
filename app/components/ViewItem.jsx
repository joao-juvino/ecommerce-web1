"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ViewItemChange from "./ViewItemChange";

export default function ViewItem({ images = [] }) {
    const [currentImage, setCurrentImage] = useState('');
    useEffect(() => {
      if (images && images.length > 0) {setCurrentImage(images[0].url_imagem);} 
      else {setCurrentImage("/img/watch.png");}}, [images]);

    function handleZoom(event) {
        setDisplayZoom("block");
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const x = ((event.clientX - rect.left) / width) * 100;
        const y = ((event.clientY - rect.top) / height) * 100;
        element.style.setProperty("--zoom-x", `${x}%`);
        element.style.setProperty("--zoom-y", `${y}%`);
    }

    function handleRemoveZoom(event) {
        setDisplayZoom("none");
        const element = event.currentTarget;
        element.style.setProperty("--zoom-x", "0%");
        element.style.setProperty("--zoom-y", "0%");
    }
    
    const [displayZoom, setDisplayZoom] = useState("none");
    return (
        <div className="flex">
            <div className="flex flex-col gap-3">
                {/* 3. Mapeia a lista de imagens para criar os botões de troca */}
                {images.map((image) => (
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
                    style={{
                        "--url": `url(${currentImage})`,
                        "--display": displayZoom,
                    }}
                    onMouseMove={handleZoom}
                    onMouseOut={handleRemoveZoom}
                >
                    <Image
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