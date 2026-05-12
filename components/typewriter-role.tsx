"use client";

import { useState, useEffect } from "react";

export function TypewriterRole({ role }: { role: string }) {
  const [roleText, setRoleText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setRoleText(role.slice(0, i + 1));
      i++;
      if (i >= role.length) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [role]);

  return (
    <>
      {roleText}
      <span className="text-primary animate-pulse ml-1">
        {roleText.length === role.length ? "" : "|"}
      </span>
    </>
  );
}
