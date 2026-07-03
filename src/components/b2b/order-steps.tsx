import { Fragment } from "react";
import { ORDER_STEPS, type OrderStatus } from "@/types";

/** Fil de statut horizontal du suivi de commande. */
export function OrderSteps({ status }: { status: OrderStatus }) {
  if (status === "annulee") {
    return (
      <div className="rounded-xl bg-ink/5 px-4 py-3 text-sm text-ink/50">
        Cette commande a été annulée.
      </div>
    );
  }

  const currentIndex = ORDER_STEPS.findIndex((s) => s.key === status);

  return (
    <div className="flex items-start">
      {ORDER_STEPS.map((step, i) => {
        const done = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <Fragment key={step.key}>
            <div className="flex w-16 flex-col items-center sm:w-20">
              <div
                className={`grid h-8 w-8 place-items-center rounded-full text-xs ${
                  done ? "bg-clay text-cream" : "bg-ink/10 text-ink/40"
                } ${isCurrent ? "animate-pulse-dot" : ""}`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`mt-2 text-center text-[11px] leading-tight ${
                  done ? "text-ink" : "text-ink/40"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < ORDER_STEPS.length - 1 && (
              <div
                className={`mt-4 h-0.5 flex-1 ${
                  i < currentIndex ? "bg-clay" : "bg-ink/10"
                }`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
