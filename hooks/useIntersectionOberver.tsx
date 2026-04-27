"use client";

import { navLinks } from "@/consts";
import { useEffect, useState } from "react";

export default function useIntersectionObserver() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            if (navLinks.find((link) => link.label.toLowerCase() === `${entry.target.id}`)) {
              window.history.replaceState(null, "", `#${entry.target.id}`);
            } else {
              window.history.replaceState(null, "", `/`);
            }
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return { activeSection, setActiveSection };
}
