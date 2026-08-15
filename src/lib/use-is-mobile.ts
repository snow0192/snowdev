"use client";

import { useSyncExternalStore } from "react";

function makeSubscribe(breakpoint: number) {
  return function subscribe(callback: () => void) {
    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  };
}

function makeGetSnapshot(breakpoint: number) {
  return function getSnapshot() {
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  };
}

export function useIsMobile(breakpoint = 768) {
  return useSyncExternalStore(
    makeSubscribe(breakpoint),
    makeGetSnapshot(breakpoint),
    () => true,
  );
}