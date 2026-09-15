import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { practiceService } from "../services/practiceService";
import type { Practice } from "../types/practice";

const statusLabels = {
  DRAFT: "Bozza",
  CLASSIFICATION: "In classificazione",
  READY_FOR_PICKUP: "In attesa di ritiro",
  IN_TRANSIT: "In trasporto",
  DELIVERED: "Conferita",
  COMPLETED: "Completata",
};

export function PracticesPage() {
  const [practices, setPractices] = useState<Practice[]>([]);

  useEffect(() => {
    practiceService.getAll().then(setPractices);
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">GESTIONE</span>
          <h1>Pratiche</h1>
          <p>Gestione e tracciabilità delle pratiche di smaltimento.</p>
        </div>

        <Link to="/practices/new" className="primary-button">
          + Nuova pratica
        </Link>
      </header>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <h2>Tutte le pratiche</h2>
            <p>{practices.length} pratiche presenti</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Pratica</th>
                <th>Produttore</th>
                <th>Rifiuto</th>
                <th>Codice EER</th>
                <th>Quantità</th>
                <th>Stato</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {practices.map((practice) => (
                <tr key={practice.id}>
                  <td>
                    <Link
                      to={`/practices/${practice.id}`}
                      className="practice-link"
                    >
                      {practice.practiceCode}
                    </Link>
                  </td>

                  <td>{practice.producerName}</td>

                  <td>{practice.wasteDescription}</td>

                  <td>
                    <strong>{practice.eerCode}</strong>
                  </td>

                  <td>
                    {practice.quantity} {practice.unit}
                  </td>

                  <td>
                    <span
                      className={`status status-${practice.status.toLowerCase()}`}
                    >
                      {statusLabels[practice.status]}
                    </span>
                  </td>

                  <td>
                    <Link
                      to={`/practices/${practice.id}`}
                      className="text-link"
                    >
                      Apri →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
