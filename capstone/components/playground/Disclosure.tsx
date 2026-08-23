"use client";

import { useState, useId, type ReactNode } from "react";

interface DisclosureProps {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Disclosure({
  summary,
  children,
  defaultOpen = false,
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const panelId = useId();

  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500"
      >
        <span>{summary}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={[
            "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0",
          ].join(" ")}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="border-t border-slate-100 px-5 py-4 text-sm text-slate-600"
      >
        {children}
      </div>
    </div>
  );
}
