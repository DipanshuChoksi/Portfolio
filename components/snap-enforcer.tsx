"use client";

import { useLayoutEffect } from "react";

export function SnapEnforcer() {
  useLayoutEffect(() => {
    // Add snap classes to HTML element when on homepage
    document.documentElement.classList.add("snap-y", "snap-mandatory");

    // Remove them when navigating away
    return () => {
      document.documentElement.classList.remove("snap-y", "snap-mandatory");
    };
  }, []);

  return null;
}
