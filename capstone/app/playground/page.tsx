"use client";

import { useRef, useState } from "react";
import Modal from "@/components/playground/Modal";
import Tabs from "@/components/playground/Tabs";
import Disclosure from "@/components/playground/Disclosure";

const TABS_DATA = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <p>
        <strong>Overview tab:</strong> EcoVoice is a voice-first task management
        application built with Next.js App Router and TypeScript. This capstone
        project demonstrates accessible component patterns.
      </p>
    ),
  },
  {
    id: "features",
    label: "Features",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Voice-first task management</li>
        <li>Keyboard accessible components</li>
        <li>WAI-ARIA compliant patterns</li>
        <li>TypeScript strict mode</li>
      </ul>
    ),
  },
  {
    id: "roadmap",
    label: "Roadmap",
    content: (
      <p>
        <strong>Roadmap tab:</strong> Future work includes browser extension
        integration, multi-LLM routing, and advanced intent detection.
      </p>
    ),
  },
];

const DISCLOSURES = [
  {
    summary: "What is WAI-ARIA?",
    content:
      "WAI-ARIA (Web Accessibility Initiative – Accessible Rich Internet Applications) is a specification that defines roles, states, and properties to improve accessibility for people with disabilities.",
  },
  {
    summary: "Why is focus management important?",
    content:
      "Proper focus management ensures keyboard-only and assistive technology users can interact with dynamic UI elements such as modals and dialogs without losing their place in the page.",
  },
  {
    summary: "How does the focus trap work in the Modal?",
    content:
      "When the modal opens, focus is programmatically moved to the first focusable element inside it. Tab and Shift+Tab key presses are intercepted to loop focus within the dialog until it is closed.",
    defaultOpen: true,
  },
];

export default function PlaygroundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-12">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Component Playground
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Interactive demos for Modal, Tabs, and Disclosure — all keyboard
          accessible and WAI-ARIA compliant.
        </p>
      </div>

      {/* ─── Modal ─────────────────────────────────────────────── */}
      <section aria-labelledby="section-modal">
        <h2
          id="section-modal"
          className="mb-3 text-base font-semibold text-slate-700 uppercase tracking-wide"
        >
          Modal Dialog
        </h2>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="mb-4 text-sm text-slate-600">
            Press <kbd className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">Enter</kbd> or click the button to open the modal.
            While open, try pressing <kbd className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">Tab</kbd> / <kbd className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">Shift+Tab</kbd> to confirm focus trapping, and <kbd className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">Escape</kbd> to close.
          </p>
          <button
            ref={triggerRef}
            type="button"
            id="open-modal-btn"
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Open Modal
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirm Action"
          titleId="modal-title"
          triggerRef={triggerRef}
        >
          <p>
            This modal demonstrates full WAI-ARIA compliance. Focus is trapped
            inside. Pressing <strong>Escape</strong>, clicking the backdrop, or
            activating <strong>Cancel / Confirm</strong> will close it and return
            focus to the trigger button.
          </p>
          <p className="mt-3">
            Try tabbing — you can only reach the Close ✕, Cancel, and Confirm
            buttons.
          </p>
        </Modal>
      </section>

      {/* ─── Tabs ──────────────────────────────────────────────── */}
      <section aria-labelledby="section-tabs">
        <h2
          id="section-tabs"
          className="mb-3 text-base font-semibold text-slate-700 uppercase tracking-wide"
        >
          Tabs
        </h2>
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-4 pt-4 pb-0 text-sm text-slate-600">
            <p className="mb-2">
              Use <kbd className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">←</kbd> / <kbd className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">→</kbd> arrow keys to switch tabs.{" "}
              <kbd className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">Home</kbd> / <kbd className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">End</kbd> jump to first/last.
            </p>
          </div>
          <Tabs tabs={TABS_DATA} defaultTabId="overview" />
        </div>
      </section>

      {/* ─── Disclosure ────────────────────────────────────────── */}
      <section aria-labelledby="section-disclosure">
        <h2
          id="section-disclosure"
          className="mb-3 text-base font-semibold text-slate-700 uppercase tracking-wide"
        >
          Disclosure (Accordion)
        </h2>
        <p className="mb-3 text-sm text-slate-600">
          Each item can be toggled with <kbd className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">Enter</kbd> or <kbd className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">Space</kbd>.
        </p>
        <div className="space-y-3">
          {DISCLOSURES.map((item) => (
            <Disclosure
              key={item.summary}
              summary={item.summary}
              defaultOpen={item.defaultOpen}
            >
              {item.content}
            </Disclosure>
          ))}
        </div>
      </section>
    </div>
  );
}
