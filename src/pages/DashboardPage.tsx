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

export function DashboardPage() {
  const [practices, setPractices] = useState<Practice[]>([]);

  useEffect(() => {
    practiceService.getAll().then(setPractices);
  }, []);

  const active = practices.filter(
    (p) => p.status !== "COMPLETED"
  ).length;

  const waiting = practices.filter(
    (p) => p.status === "READY_FOR_PICKUP"
  ).length;

  const inTransit = practices.filter(
    (p) => p.status === "IN_TRANSIT"
  ).length;

  const completed = practices.filter(
    (p) => p.status === "COMPLETED"
  ).length;

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">PANORAMICA</span>
          <h1>Dashboard</h1>
          <p>Monitoraggio delle pratiche e delle attività in corso.</p>
        </div>

        <Link to="/practices" className="primary-button">
          Visualizza pratiche
        </Link>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Pratiche attive</span>
          <strong>{active}</strong>
          <small>Attualmente in lavorazione</small>
        </article>

        <article className="stat-card">
          <span>In attesa di ritiro</span>
          <strong>{waiting}</strong>
          <small>Da affidare al trasportatore</small>
        </article>

        <article className="stat-card">
          <span>In trasporto</span>
          <strong>{inTransit}</strong>
          <small>Movimentazioni in corso</small>
        </article>

        <article className="stat-card">
          <span>Completate</span>
          <strong>{completed}</strong>
          <small>Pratiche concluse</small>
        </article>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <h2>Pratiche recenti</h2>
            <p>Ultime pratiche aggiornate sulla piattaforma.</p>
          </div>

          <Link to="/practices" className="text-link">
            Vedi tutte →
          </Link>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Pratica</th>
                <th>Produttore</th>
                <th>Rifiuto</th>
                <th>Quantità</th>
                <th>Stato</th>
              </tr>
            </thead>

            <tbody>
              {practices.slice(0, 4).map((practice) => (
                <tr key={practice.id}>
                  <td>
                    <strong>{practice.practiceCode}</strong>
                  </td>
                  <td>{practice.producerName}</td>
                  <td>
                    {practice.wasteDescription}
                    <small className="table-secondary">
                      EER {practice.eerCode}
                    </small>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
