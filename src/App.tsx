import "./App.css";
import { useState } from "react";
import FlashCardSetup from "./components/FlashCardSetup";
import FlashCardSession from "./components/FlashCardSession";
import AppCard from "./components/AppCard";
import type { StudySetup } from "./models/studySetup/StudySetup";
import type { StudyStatistics } from "./models/Statistics";

type Phase =
  | { name: "setup" }
  | { name: "session"; setup: StudySetup }
  | { name: "result"; stats: StudyStatistics };

const ResultView = ({
  stats,
  onRestart,
}: {
  stats: StudyStatistics;
  onRestart: () => void;
}) => (
  <AppCard
    title="hex_flash_card — result"
    footer={
      <>
        <span className="ac-status ac-status-live">● DONE</span>
        <span className="ac-status">HEX ↔ BINARY</span>
        <span className="ac-status">v0.1.0</span>
      </>
    }
  >
    <style>{`
      .rv-body { padding: 40px 24px 28px; text-align: center; }
      .rv-rate { font-size: 64px; font-weight: 700; color: #111827; line-height: 1; }
      .rv-rate-label { font-size: 12px; color: #9ca3af; margin-top: 6px; letter-spacing: 0.05em; text-transform: uppercase; }
      .rv-stats { display: flex; justify-content: center; gap: 32px; margin: 28px 0; }
      .rv-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
      .rv-stat-val { font-size: 28px; font-weight: 700; }
      .rv-stat-val.correct { color: #16a34a; }
      .rv-stat-val.incorrect { color: #dc2626; }
      .rv-stat-val.total { color: #374151; }
      .rv-stat-label { font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; }
      .rv-divider { height: 1px; background: #f3f4f6; margin-bottom: 24px; }
      .rv-btn { all: unset; box-sizing: border-box; width: 100%; padding: 13px; border-radius: 6px; background: #3b82f6; color: #fff; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; text-align: center; transition: background 0.15s; }
      .rv-btn:hover { background: #2563eb; }
      .rv-btn:active { background: #1d4ed8; }
    `}</style>
    <div className="rv-body">
      <div className="rv-rate">{Math.round(stats.correctRate * 100)}%</div>
      <div className="rv-rate-label">Correct Rate</div>
      <div className="rv-stats">
        <div className="rv-stat">
          <span className="rv-stat-val correct">{stats.corrects}</span>
          <span className="rv-stat-label">Correct</span>
        </div>
        <div className="rv-stat">
          <span className="rv-stat-val incorrect">{stats.incorrects}</span>
          <span className="rv-stat-label">Incorrect</span>
        </div>
        <div className="rv-stat">
          <span className="rv-stat-val total">{stats.sumOfProblems}</span>
          <span className="rv-stat-label">Total</span>
        </div>
      </div>
      <div className="rv-divider" />
      <button className="rv-btn" onClick={onRestart}>
        Try Again
      </button>
    </div>
  </AppCard>
);

/**
 * 2진수 <--> 16진수 변환 연습 플래시카드
 */
function App() {
  const [phase, setPhase] = useState<Phase>({ name: "setup" });

  if (phase.name === "session") {
    return (
      <FlashCardSession
        setup={phase.setup}
        onFinish={(stats) => setPhase({ name: "result", stats })}
        onBack={() => setPhase({ name: "setup" })}
      />
    );
  }

  if (phase.name === "result") {
    return (
      <ResultView
        stats={phase.stats}
        onRestart={() => setPhase({ name: "setup" })}
      />
    );
  }

  return (
    <FlashCardSetup
      onSubmit={(setup) => setPhase({ name: "session", setup })}
    />
  );
}

export default App;
