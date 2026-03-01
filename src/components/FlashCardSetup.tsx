import { useState } from "react";
import type { StudySetup } from "../models/studySetup/StudySetup";
import { StudyMode } from "../models/StudyMode";
import AppCard from "./AppCard";

interface Props {
  onSubmit: (setup: StudySetup) => void;
}

const CSS = `
  .fcs-body {
    padding: 28px 24px 24px;
  }

  .fcs-prompt {
    margin-bottom: 28px;
  }

  .fcs-prompt-text {
    font-size: 15px;
    color: #111827;
    font-weight: 600;
  }

  .fcs-prompt-text em {
    font-style: normal;
    color: #3b82f6;
  }

  .fcs-section-label {
    font-size: 11px;
    color: #9ca3af;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .fcs-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }

  .fcs-mode-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 24px;
  }

  .fcs-mode-btn {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 14px 14px 12px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 5px;
    transition: border-color 0.12s, background 0.12s;
  }

  .fcs-mode-btn:hover {
    border-color: #93c5fd;
    background: #f8faff;
  }

  .fcs-mode-btn.fcs-active {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  .fcs-mode-check {
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: #d1d5db;
    transition: color 0.12s;
  }

  .fcs-active .fcs-mode-check {
    color: #3b82f6;
  }

  .fcs-mode-name {
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
    transition: color 0.12s;
  }

  .fcs-active .fcs-mode-name {
    color: #1d4ed8;
  }

  .fcs-mode-desc {
    font-size: 11px;
    color: #d1d5db;
    transition: color 0.12s;
  }

  .fcs-active .fcs-mode-desc {
    color: #60a5fa;
  }

  .fcs-count-section {
    margin-bottom: 24px;
    animation: fcs-slide-down 0.2s ease-out;
  }

  .fcs-count-row {
    display: flex;
    align-items: stretch;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
    height: 48px;
  }

  .fcs-count-adj {
    all: unset;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    font-size: 20px;
    cursor: pointer;
    transition: background 0.1s, color 0.1s;
    flex-shrink: 0;
    background: #f9fafb;
  }

  .fcs-count-adj:hover { background: #f3f4f6; color: #111827; }
  .fcs-count-adj:active { background: #e5e7eb; }

  .fcs-count-sep {
    width: 1px;
    background: #e5e7eb;
    flex-shrink: 0;
  }

  .fcs-count-val {
    flex: 1;
    text-align: center;
    background: transparent;
    border: none;
    outline: none;
    color: #111827;
    font-family: inherit;
    font-size: 22px;
    font-weight: 700;
    width: 100%;
    padding: 0;
    -moz-appearance: textfield;
  }

  .fcs-count-val::-webkit-outer-spin-button,
  .fcs-count-val::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .fcs-count-hint {
    margin-top: 6px;
    font-size: 11px;
    color: #d1d5db;
    text-align: right;
  }

  .fcs-submit {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    padding: 13px 24px;
    border-radius: 6px;
    background: #3b82f6;
    color: #ffffff;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    transition: background 0.15s;
  }

  .fcs-submit:hover { background: #2563eb; }
  .fcs-submit:active { background: #1d4ed8; }

  .fcs-status {
    font-size: 10px;
    color: #d1d5db;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .fcs-status-live {
    color: #22c55e;
    font-weight: 600;
  }

  @keyframes fcs-slide-down {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const MODES = [
  { value: StudyMode.NORMAL, label: "Normal", desc: "Fixed card count" },
  { value: StudyMode.INFINITY, label: "∞ Infinity", desc: "No end condition" },
] as const;

const FlashCardSetup = ({ onSubmit }: Props) => {
  const [mode, setMode] = useState<StudyMode>(StudyMode.NORMAL);
  const [numberOfCards, setNumberOfCards] = useState(10);

  const clamp = (n: number) => Math.min(100, Math.max(1, n));

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    if (!isNaN(v)) setNumberOfCards(clamp(v));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ mode, numberOfCards });
  };

  const footer = (
    <>
      <span className="fcs-status fcs-status-live">● READY</span>
      <span className="fcs-status">HEX ↔ BINARY</span>
      <span className="fcs-status">v0.1.0</span>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <AppCard title="hex_flash_card — setup" footer={footer}>
        <form onSubmit={handleSubmit} className="fcs-body">
          <div className="fcs-prompt">
            <span className="fcs-prompt-text">
              Configure your <em>study session</em>
            </span>
          </div>

          <div className="fcs-section-label">Study Mode</div>
          <div className="fcs-mode-grid">
            {MODES.map(({ value, label, desc }) => (
              <button
                key={value}
                type="button"
                className={`fcs-mode-btn${mode === value ? " fcs-active" : ""}`}
                onClick={() => setMode(value)}
              >
                <span className="fcs-mode-check">{mode === value ? "●" : "○"}</span>
                <span className="fcs-mode-name">{label}</span>
                <span className="fcs-mode-desc">{desc}</span>
              </button>
            ))}
          </div>

          {mode === StudyMode.NORMAL && (
            <div className="fcs-count-section">
              <div className="fcs-section-label">Number of Cards</div>
              <div className="fcs-count-row">
                <button
                  type="button"
                  className="fcs-count-adj"
                  onClick={() => setNumberOfCards((n) => clamp(n - 1))}
                >
                  −
                </button>
                <div className="fcs-count-sep" />
                <input
                  type="number"
                  className="fcs-count-val"
                  value={numberOfCards}
                  min={1}
                  max={100}
                  onChange={handleCountChange}
                />
                <div className="fcs-count-sep" />
                <button
                  type="button"
                  className="fcs-count-adj"
                  onClick={() => setNumberOfCards((n) => clamp(n + 1))}
                >
                  +
                </button>
              </div>
              <div className="fcs-count-hint">RANGE: 1 – 100</div>
            </div>
          )}

          <button type="submit" className="fcs-submit">
            Start Session
          </button>
        </form>
      </AppCard>
    </>
  );
};

export default FlashCardSetup;
