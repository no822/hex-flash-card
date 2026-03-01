import { useEffect, useRef, useState } from "react";
import type { FlashCard } from "../models/flashCard/FlashCard";
import { FlashCardType } from "../models/FlashCardType";

interface Props {
  card: FlashCard;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const CSS = `
  .hbc-body {
    padding: 32px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .hbc-section {
    text-align: center;
  }

  .hbc-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #9ca3af;
    margin-bottom: 14px;
  }

  .hbc-value {
    font-size: 52px;
    font-weight: 700;
    color: #111827;
    font-family: 'Courier New', Courier, monospace;
    letter-spacing: 0.06em;
    line-height: 1;
    word-break: break-all;
  }

  .hbc-value-md { font-size: 40px; }
  .hbc-value-sm { font-size: 28px; }

  .hbc-sublabel {
    font-size: 11px;
    color: #d1d5db;
    margin-top: 8px;
  }

  .hbc-divider {
    height: 1px;
    background: #f3f4f6;
  }

  .hbc-input-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #9ca3af;
    margin-bottom: 8px;
  }

  .hbc-input-row {
    display: flex;
    gap: 8px;
  }

  .hbc-input {
    flex: 1;
    padding: 12px 14px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    outline: none;
    transition: border-color 0.15s;
    background: #ffffff;
    min-width: 0;
  }

  .hbc-input:focus { border-color: #3b82f6; }
  .hbc-input:disabled { background: #f9fafb; }

  .hbc-input.hbc-correct { border-color: #16a34a; background: #f0fdf4; color: #15803d; }
  .hbc-input.hbc-incorrect { border-color: #dc2626; background: #fef2f2; color: #b91c1c; }

  .hbc-btn-check {
    all: unset;
    box-sizing: border-box;
    padding: 12px 20px;
    border-radius: 6px;
    background: #3b82f6;
    color: #ffffff;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.12s;
    flex-shrink: 0;
  }

  .hbc-btn-check:hover { background: #2563eb; }
  .hbc-btn-check:active { background: #1d4ed8; }
  .hbc-btn-check:disabled { background: #d1d5db; cursor: not-allowed; }

  .hbc-feedback {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.5;
  }

  .hbc-feedback.hbc-feedback-correct {
    background: #f0fdf4;
    color: #15803d;
    border: 1px solid #bbf7d0;
  }

  .hbc-feedback.hbc-feedback-incorrect {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }

  .hbc-feedback-icon {
    font-size: 16px;
    flex-shrink: 0;
    line-height: 1.4;
  }

  .hbc-feedback-answer {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 700;
    font-size: 14px;
  }

  .hbc-btn-next {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    padding: 13px;
    border-radius: 6px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    color: #374151;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    transition: background 0.12s, border-color 0.12s;
  }

  .hbc-btn-next:hover { background: #f3f4f6; border-color: #d1d5db; }
  .hbc-btn-next:active { background: #e5e7eb; }
`;

const formatBinary = (b: string, hexDigits: number) => {
  const totalBits = hexDigits * 4;
  return b.padStart(totalBits, "0").match(/.{4}/g)?.join(" ") ?? b;
};

const valueSizeClass = (text: string) => {
  const len = text.replace(/\s/g, "").length;
  if (len <= 4) return "";
  if (len <= 8) return " hbc-value-md";
  return " hbc-value-sm";
};

const normalize = (s: string) =>
  s.replace(/\s/g, "").toUpperCase().replace(/^0+/, "") || "0";

const cardConfig = (card: FlashCard, hexDigits: number) => {
  switch (card.config.type) {
    case FlashCardType.BINARY:
      return {
        question: formatBinary(card.binary, hexDigits),
        questionLabel: "Binary",
        correctAnswer: card.hex,
        answerLabel: "Hexadecimal",
        placeholder: "e.g. F5",
        filterInput: (raw: string) => raw.replace(/[^0-9a-fA-F]/g, ""),
        formatAnswer: (s: string) => s.toUpperCase(),
      };
    case FlashCardType.DECIMAL_TO_BINARY:
      return {
        question: card.decimal,
        questionLabel: "Decimal",
        correctAnswer: card.binary,
        answerLabel: "Binary",
        placeholder: "e.g. 11110101",
        filterInput: (raw: string) => raw.replace(/[^01\s]/g, ""),
        formatAnswer: (s: string) => s,
      };
    case FlashCardType.BINARY_TO_DECIMAL:
      return {
        question: formatBinary(card.binary, hexDigits),
        questionLabel: "Binary",
        correctAnswer: card.decimal,
        answerLabel: "Decimal",
        placeholder: "e.g. 42",
        filterInput: (raw: string) => raw.replace(/[^0-9]/g, ""),
        formatAnswer: (s: string) => s,
      };
    default: // HEX
      return {
        question: card.hex.toUpperCase(),
        questionLabel: "Hexadecimal",
        correctAnswer: card.binary,
        answerLabel: "Binary",
        placeholder: "e.g. 11110101",
        filterInput: (raw: string) => raw.replace(/[^01\s]/g, ""),
        formatAnswer: (s: string) => formatBinary(s, hexDigits),
      };
  }
};

const HexBinaryCard = ({ card, onCorrect, onIncorrect }: Props) => {
  const hexDigits = card.hex.length;
  const { question, questionLabel, correctAnswer, answerLabel, placeholder, filterInput, formatAnswer } =
    cardConfig(card, hexDigits);

  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isCorrect = submitted && normalize(userInput) === normalize(correctAnswer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setUserInput(filterInput(raw));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim() || submitted) return;
    setSubmitted(true);
  };

  const handleNext = () => {
    if (isCorrect) onCorrect();
    else onIncorrect();
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="hbc-body">
        {/* Question */}
        <div className="hbc-section">
          <div className="hbc-label">Question</div>
          <div className={`hbc-value${valueSizeClass(question)}`}>{question}</div>
          <div className="hbc-sublabel">{questionLabel}</div>
        </div>

        <div className="hbc-divider" />

        {/* Answer input */}
        <form onSubmit={handleSubmit}>
          <div className="hbc-input-label">{answerLabel}</div>
          <div className="hbc-input-row">
            <input
              ref={inputRef}
              className={`hbc-input${submitted ? (isCorrect ? " hbc-correct" : " hbc-incorrect") : ""}`}
              value={userInput}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={submitted}
              autoComplete="off"
            />
            {!submitted && (
              <button
                type="submit"
                className="hbc-btn-check"
                disabled={!userInput.trim()}
              >
                Check
              </button>
            )}
          </div>
        </form>

        {/* Feedback */}
        {submitted && (
          <div className={`hbc-feedback hbc-feedback-${isCorrect ? "correct" : "incorrect"}`}>
            <span className="hbc-feedback-icon">{isCorrect ? "✓" : "✗"}</span>
            {isCorrect ? (
              <span>Correct!</span>
            ) : (
              <span>
                Incorrect — correct answer is{" "}
                <span className="hbc-feedback-answer">
                  {formatAnswer(correctAnswer)}
                </span>
              </span>
            )}
          </div>
        )}

        {/* Next button */}
        {submitted && (
          <button className="hbc-btn-next" onClick={handleNext}>
            Next →
          </button>
        )}
      </div>
    </>
  );
};

export default HexBinaryCard;
