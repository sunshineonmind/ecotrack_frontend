import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { practiceService } from "../services/practiceService";
import type { QuantityUnit } from "../types/practice";

export function NewPracticePage() {
  const navigate = useNavigate();

  const [wasteDescription, setWasteDescription] = useState("");
  const [eerCode, setEerCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<QuantityUnit>("kg");
  const [producerName, setProducerName] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);

    try {
      const practice = await practiceService.create({
        wasteDescription: wasteDescription.trim(),
        eerCode: eerCode.trim(),
        quantity: Number(quantity),
        unit,
        producerName: producerName.trim(),
      });

      navigate(`/practices/${practice.id}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <div className="breadcrumb">
        <Link to="/practices">Pratiche</Link>
        <span>›</span>
        <span>Nuova pratica</span>
      </div>

      <header className="page-header">
        <div>
          <span className="eyebrow">NUOVA PRATICA</span>
          <h1>Apri una nuova pratica</h1>
          <p>
            Inserisci le informazioni iniziali relative al rifiuto.
          </p>
        </div>
      </header>

      <form className="practice-form" onSubmit={handleSubmit}>
        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Produttore</h2>
              <p>Soggetto che ha prodotto il rifiuto.</p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="producerName">
              Ragione sociale
            </label>

            <input
              id="producerName"
              type="text"
              value={producerName}
              onChange={(event) =>
                setProducerName(event.target.value)
              }
              placeholder="Es. Industria Rossi S.r.l."
              required
            />
          </div>
        </section>

        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Rifiuto</h2>
              <p>
                Informazioni principali per l'apertura della pratica.
              </p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group form-group-wide">
              <label htmlFor="description">
                Descrizione
              </label>

              <input
                id="description"
                type="text"
                value={wasteDescription}
                onChange={(event) =>
                  setWasteDescription(event.target.value)
                }
                placeholder="Es. Solventi organici"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="eerCode">
                Codice EER
              </label>

              <input
                id="eerCode"
                type="text"
                value={eerCode}
                onChange={(event) =>
                  setEerCode(event.target.value)
                }
                placeholder="Es. 14 06 03*"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">
                Quantità
              </label>

              <div className="quantity-input">
                <input
                  id="quantity"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(event.target.value)
                  }
                  placeholder="0"
                  required
                />

                <select
                  value={unit}
                  onChange={(event) =>
                    setUnit(
                      event.target.value as QuantityUnit
                    )
                  }
                >
                  <option value="kg">kg</option>
                  <option value="t">t</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="form-actions">
          <Link
            to="/practices"
            className="secondary-button"
          >
            Annulla
          </Link>

          <button
            type="submit"
            className="primary-button button-reset"
            disabled={saving}
          >
            {saving ? "Creazione..." : "Crea pratica"}
          </button>
        </div>
      </form>
    </div>
  );
}