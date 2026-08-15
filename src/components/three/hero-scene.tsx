"use client";

import dynamic from "next/dynamic";

const NetworkScene = dynamic(() => import("./network-scene"), {
  ssr: false,
  loading: () => null,
});

export function HeroScene() {
  return (
    <div
      data-hero-canvas
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    >
      <NetworkScene />
    </div>
  );
}