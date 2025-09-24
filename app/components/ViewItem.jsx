"use client";
import Image from "next/image";
import { useState } from "react";

export default function ViewItem() {
    const [displayZoom, setDisplayZoom] = useState("none");

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
        <div className="h-100 pt-10">
            <div
                id="zoom"
                className="relative w-full h-55 cursor-pointer"
                style={{
                    "--url": "url(/img/watch.png)",
                    "--display": displayZoom,
                }}
                onMouseMove={handleZoom}
                onMouseOut={handleRemoveZoom}
            >
                <Image
                    src="/img/watch.png"
                    width={400}
                    height={400}
                    alt="imagem do item"
                />
            </div>
        </div>
    );
}
