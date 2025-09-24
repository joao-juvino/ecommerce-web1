"use client";
import Image from "next/image";
import { useState } from "react";
import ViewItemChange from "./ViewItemChange";

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

    return (
        <div className="flex">
            <div className="flex flex-col gap-3">
                <ViewItemChange
                    url={"/img/watch.png"}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                />
                <ViewItemChange
                    url={"/img/watchback.png"}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                />
            </div>

            <div>
                <div
                    id="zoom"
                    className="relative cursor-pointer"
                    style={{
                        "--url": `url(${currentImage || '/img/watch.png'})`,
                        "--display": displayZoom,
                    }}
                    onMouseMove={handleZoom}
                    onMouseOut={handleRemoveZoom}
                >
                    <Image
                        src={currentImage || "/img/watch.png"}
                        width={600}
                        height={600}
                        alt="imagem do item"
                    />
                </div>
            </div>
        </div>
    );
}
