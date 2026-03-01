import { useState } from "react";
import { Difficulty } from "../models/Difficulty";
import { FlashCardType } from "../models/FlashCardType";
import { StudyMode } from "../models/StudyMode";
import type { StudySetup } from "../models/studySetup/StudySetup";
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

  .fcs-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 24px;
  }

  .fcs-grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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

  @keyframes fcs-slide-down {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const MODES = [
  { value: StudyMode.NORMAL, label: "Normal", desc: "Fixed card count" },
  { value: StudyMode.INFINITY, label: "∞ Infinity", desc: "No end condition" },
] as const;

const CARD_TYPES = [
  { value: FlashCardType.HEX, label: "HEX → BIN", desc: "Type the binary" },
  { value: FlashCardType.BINARY, label: "BIN → HEX", desc: "Type the hex" },
] as const;

const DIFFICULTIES = [
  { value: Difficulty.EASY, label: "Easy", desc: "1 hex digit" },
  { value: Difficulty.MEDIUM, label: "Medium", desc: "2 hex digits" },
  { value: Difficulty.HARD, label: "Hard", desc: "4 hex digits" },
] as const;

const FlashCardSetup = ({ onSubmit }: Props) => {
  const [mode, setMode] = useState<StudyMode>(StudyMode.NORMAL);
  const [numberOfCards, setNumberOfCards] = useState(10);
  const [type, setType] = useState<FlashCardType>(FlashCardType.HEX);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);

  const clamp = (n: number) => Math.min(100, Math.max(1, n));

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    if (!isNaN(v)) setNumberOfCards(clamp(v));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ mode, numberOfCards, type, difficulty });
  };

  const footer = (
    <>
      <span className="ac-status ac-status-live">● READY</span>
      <span className="ac-status">HEX ↔ BINARY</span>
      <span className="ac-status">v0.1.0</span>
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

          {/* Card Type */}
          <div className="fcs-section-label">Card Type</div>
          <div className="fcs-grid-2">
            {CARD_TYPES.map(({ value, label, desc }) => (
              <button
                key={value}
                type="button"
                className={`fcs-mode-btn${type === value ? " fcs-active" : ""}`}
                onClick={() => setType(value)}
              >
                <span className="fcs-mode-check">{type === value ? "●" : "○"}</span>
                <span className="fcs-mode-name">{label}</span>
                <span className="fcs-mode-desc">{desc}</span>
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="fcs-section-label">Difficulty</div>
          <div className="fcs-grid-3">
            {DIFFICULTIES.map(({ value, label, desc }) => (
              <button
                key={value}
                type="button"
                className={`fcs-mode-btn${difficulty === value ? " fcs-active" : ""}`}
                onClick={() => setDifficulty(value)}
              >
                <span className="fcs-mode-check">{difficulty === value ? "●" : "○"}</span>
                <span className="fcs-mode-name">{label}</span>
                <span className="fcs-mode-desc">{desc}</span>
              </button>
            ))}
          </div>

          {/* Study Mode */}
          <div className="fcs-section-label">Study Mode</div>
          <div className="fcs-grid-2">
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

          {/* Number of Cards */}
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
