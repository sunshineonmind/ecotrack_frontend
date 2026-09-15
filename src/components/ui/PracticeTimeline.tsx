import type { PracticeStatus } from "../../types/practice";

interface PracticeTimelineProps {
  status: PracticeStatus;
}

const steps = [
  { key: "DRAFT", label: "Creazione", description: "Pratica aperta" },
  {
    key: "CLASSIFICATION",
    label: "Classificazione",
    description: "Classificazione del rifiuto",
  },
  {
    key: "READY_FOR_PICKUP",
    label: "Ritiro",
    description: "Pronto per il trasporto",
  },
  {
    key: "IN_TRANSIT",
    label: "Trasporto",
    description: "Movimentazione del rifiuto",
  },
  {
    key: "DELIVERED",
    label: "Conferimento",
    description: "Arrivo all'impianto",
  },
  {
    key: "COMPLETED",
    label: "Chiusura",
    description: "Pratica completata",
  },
] as const;

export function PracticeTimeline({ status }: PracticeTimelineProps) {
  const currentIndex = steps.findIndex((step) => step.key === status);

  return (
    <div className="practice-timeline">
      {steps.map((step, index) => {
        const completed = index < currentIndex;
        const current = index === currentIndex;

        return (
          <div
            key={step.key}
            className={`timeline-step ${
              completed ? "completed" : current ? "current" : ""
            }`}
          >
            <div className="timeline-marker">
              {completed ? "✓" : index + 1}
            </div>

            <div className="timeline-content">
              <strong>{step.label}</strong>
              <span>{step.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
