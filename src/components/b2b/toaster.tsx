"use client";

import { useToasts } from "@/stores/toast-store";

export function Toaster() {
  const toasts = useToasts((s) => s.toasts);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-toast-in pointer-events-auto flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm text-cream shadow-lg"
        >
          <span
            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] ${
              t.type === "success" ? "bg-olive text-cream" : "bg-clay text-cream"
            }`}
          >
            {t.type === "success" ? "✓" : "i"}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
