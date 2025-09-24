"use client";
import { useState } from "react";

export default function RangeSlider({
  trackColor = "#e5e7eb",
  progressColor = "#ba4949",
  thumbColor = "#ba4949",
}) {
  const [value, setValue] = useState(50);

  const percent = ((value - 0) / (100 - 0)) * 100;

  return (
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="
        w-40 appearance-none bg-transparent cursor-pointer

        /* WebKit track */
        [&::-webkit-slider-runnable-track]:h-2
        [&::-webkit-slider-runnable-track]:rounded-full

        /* Thumb */
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-4 
        [&::-webkit-slider-thumb]:w-4 
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-[var(--thumb-color)]
        [&::-webkit-slider-thumb]:mt-[-4px]  /* alinhamento correto */

        /* Firefox */
        [&::-moz-range-track]:h-2
        [&::-moz-range-track]:rounded-full
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:bg-[var(--thumb-color)]
        [&::-moz-range-progress]:h-2
        [&::-moz-range-progress]:rounded-full
        [&::-moz-range-progress]:bg-[var(--progress-color)]
      "
      style={{
        "--thumb-color": thumbColor,
        "--progress-color": progressColor,
        "--track-color": trackColor,
        background: `linear-gradient(to right, ${progressColor} 0% ${percent}%, ${trackColor} ${percent}% 100%)`,
      }}
    />
  );
}
