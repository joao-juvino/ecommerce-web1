"use client";
import Image from "next/image";
import { useState } from "react";

export default function ViewItem() {
    const [displayZoom, setDisplayZoom] = useState("none");
    const [currentImage, setCurrentImage] = useState("/img/watch.png");

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

    function handleChangeImage(imageURL) {
        setCurrentImage(imageURL);
    }

    return (
        <div className="flex">
            <div className="flex flex-col gap-3">
                <div
                    style={{
                        borderColor: currentImage === '/img/watch.png' ? '#ba4949' : '#d1d5db',
                    }}
                    className="cursor-pointer relative w-15 h-15 rounded-sm border-1"
                    onMouseOver={() => handleChangeImage("/img/watch.png")}
                >
                    <Image
                        src="/img/watch.png"
                        alt="Relógio"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                <div
                    style={{
                        borderColor: currentImage === '/img/watchback.png' ? '#ba4949' : '#d1d5db',
                    }}
                    className="cursor-pointer relative w-15 h-15 rounded-sm border-1"
                    onMouseOver={() => handleChangeImage("/img/watchback.png")}
                >
                    <Image
                        src="/img/watchback.png"
                        alt="Relógio"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            </div>

            <div className="h-100 pt-10">
                <div
                    id="zoom"
                    className="relative w-full h-55 cursor-pointer"
                    style={{
                        "--url": `url(${currentImage || '/img/watch.png'})`,
                        "--display": displayZoom,
                    }}
                    onMouseMove={handleZoom}
                    onMouseOut={handleRemoveZoom}
                >
                    <Image
                        src={currentImage || "/img/watch.png"}
                        width={400}
                        height={400}
                        alt="imagem do item"
                    />
                </div>
            </div>
        </div>
    );
}
