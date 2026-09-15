import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { practiceService } from "../services/practiceService";
import type { Practice } from "../types/practice";
import { PracticeTimeline } from "../components/ui/PracticeTimeline";

const statusLabels = {
  DRAFT: "Bozza",
  CLASSIFICATION: "In classificazione",
  READY_FOR_PICKUP: "In attesa di ritiro",
  IN_TRANSIT: "In trasporto",
  DELIVERED: "Conferita",
  COMPLETED: "Completata",
};

export function PracticeDetailPage() {
  const { id } = useParams();
  const [practice, setPractice] = useState<Practice | undefined>();

  useEffect(() => {
    if (id) {
      practiceService.getById(id).then(setPractice);
    }
  }, [id]);

  if (!practice) {
    return (
      <div className="page">
        <p>Pratica non trovata.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="breadcrumb">
        <Link to="/practices">Pratiche</Link>
        <span>›</span>
        <span>{practice.practiceCode}</span>
      </div>

      <header className="page-header detail-header">
        <div>
          <span className="eyebrow">DETTAGLIO PRATICA</span>
          <h1>{practice.practiceCode}</h1>
          <p>Creata da {practice.producerName}</p>
        </div>

        <span
          className={`status detail-status status-${practice.status.toLowerCase()}`}
        >
          {statusLabels[practice.status]}
        </span>
      </header>

      <div className="detail-grid">
        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Informazioni sul rifiuto</h2>
              <p>Dati principali associati alla pratica.</p>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span>Descrizione</span>
              <strong>{practice.wasteDescription}</strong>
            </div>

            <div className="info-item">
              <span>Codice EER</span>
              <strong>{practice.eerCode}</strong>
            </div>

            <div className="info-item">
              <span>Quantità</span>
              <strong>
                {practice.quantity} {practice.unit}
              </strong>
            </div>

            <div className="info-item">
              <span>Produttore</span>
              <strong>{practice.producerName}</strong>
            </div>
          </div>
        </section>

        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Stato della pratica</h2>
              <p>Avanzamento del processo.</p>
            </div>
          </div>

          <div className="current-status">
            <span>Stato corrente</span>
            <strong>{statusLabels[practice.status]}</strong>
          </div>

          <div className="detail-dates">
            <div>
              <span>Creata</span>
              <strong>
                {new Date(practice.createdAt).toLocaleDateString("it-IT")}
              </strong>
            </div>

            <div>
              <span>Ultimo aggiornamento</span>
              <strong>
                {new Date(practice.updatedAt).toLocaleDateString("it-IT")}
              </strong>
            </div>
          </div>
        </section>

        <section className="content-card timeline-card">
          <div className="section-heading">
            <div>
              <h2>Ciclo della pratica</h2>
              <p>
                Avanzamento della pratica dalla produzione del rifiuto fino alla
                chiusura.
              </p>
            </div>
          </div>

          <PracticeTimeline status={practice.status} />
        </section>
      </div>
    </div>
  );
}
