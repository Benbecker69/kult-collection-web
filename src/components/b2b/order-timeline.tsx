import type { DeliveryStep } from "@/types";

/** Timeline verticale du suivi de livraison. */
export function OrderTimeline({ steps }: { steps: DeliveryStep[] }) {
  if (!steps.length) {
    return (
      <p className="text-sm text-ink/50">
        Aucun suivi de livraison disponible pour cette commande.
      </p>
    );
  }

  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const nextDone = steps[i + 1]?.done;
        const isCurrent = step.done && !nextDone;
        return (
          <li key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`z-10 h-4 w-4 rounded-full ${
                  step.done
                    ? "bg-clay"
                    : "border-2 border-ink/20 bg-cream"
                } ${isCurrent ? "animate-pulse-dot" : ""}`}
              />
              {i < steps.length - 1 && (
                <span
                  className={`w-0.5 flex-1 ${step.done ? "bg-clay/50" : "bg-ink/10"}`}
                />
              )}
            </div>
            <div className="-mt-1 pb-6">
              <p
                className={`text-sm ${
                  step.done ? "font-medium text-ink" : "text-ink/40"
                }`}
              >
                {step.label}
              </p>
              {step.date && <p className="text-xs text-ink/40">{step.date}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
