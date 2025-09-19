"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ImageMagnifier({ src, zoom = 5, width = 400, height = 400 }) {
  const containerRef = useRef();
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPos({ x, y });
  };

  const lensSize = 100;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
    >
      <Image src={src} alt="product" className="w-full h-full object-cover" />

      {/* Lente */}
      {showLens && (
        <div
          className="absolute border-2 border-gray-400 rounded bg-white/20 pointer-events-none"
          style={{
            width: lensSize,
            height: lensSize,
            left: lensPos.x - lensSize / 2,
            top: lensPos.y - lensSize / 2,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPositionX: `-${lensPos.x * zoom - lensSize / 2}px`,
            backgroundPositionY: `-${lensPos.y * zoom - lensSize / 2}px`,
          }}
        />
      )}
    </div>
  );
}
