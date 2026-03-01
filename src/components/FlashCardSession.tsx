import { useMemo, useState } from "react";
import { Difficulty } from "../models/Difficulty";
import type { FlashCard } from "../models/flashCard/FlashCard";
import DefaultFlashCardFactory from "../models/flashCard/DefaultFlashCardFactory";
import type { StudyStatistics } from "../models/Statistics";
import type { StudySetup } from "../models/studySetup/StudySetup";
import { StudyMode } from "../models/StudyMode";
import AppCard from "./AppCard";
import HexBinaryCard from "./HexBinaryCard";

interface Props {
  setup: StudySetup;
  onFinish: (stats: StudyStatistics) => void;
  onBack: () => void;
}

const DIFFICULTY_CONFIG: Record<Difficulty, { max: number; digits: number }> = {
  [Difficulty.EASY]:   { max: 16,    digits: 1 },
  [Difficulty.MEDIUM]: { max: 256,   digits: 2 },
  [Difficulty.HARD]:   { max: 65536, digits: 4 },
};

const FlashCardSession = ({ setup, onFinish, onBack }: Props) => {
  const factory = useMemo(
    () => new DefaultFlashCardFactory({ type: setup.type }),
    [setup.type]
  );

  const generateValue = () => {
    const { max, digits } = DIFFICULTY_CONFIG[setup.difficulty];
    return Math.floor(Math.random() * max)
      .toString(16)
      .toUpperCase()
      .padStart(digits, "0");
  };

  const isInfinity = setup.mode === StudyMode.INFINITY;
  const total = isInfinity ? null : setup.numberOfCards;

  const [cards, setCards] = useState<FlashCard[]>(() =>
    Array.from({ length: isInfinity ? 1 : setup.numberOfCards }, () =>
      factory.create(generateValue())
    )
  );
  const [index, setIndex] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [incorrects, setIncorrects] = useState(0);

  const card = cards[index];

  const handleAnswer = (correct: boolean) => {
    const nextCorrects = corrects + (correct ? 1 : 0);
    const nextIncorrects = incorrects + (correct ? 0 : 1);
    setCorrects(nextCorrects);
    setIncorrects(nextIncorrects);

    const nextIndex = index + 1;

    if (!isInfinity && nextIndex >= setup.numberOfCards) {
      const sum = nextCorrects + nextIncorrects;
      onFinish({
        sumOfProblems: sum,
        corrects: nextCorrects,
        incorrects: nextIncorrects,
        correnctRate: sum > 0 ? nextCorrects / sum : 0,
      });
      return;
    }

    if (isInfinity && nextIndex >= cards.length) {
      setCards((prev) => [...prev, factory.create(generateValue())]);
    }

    setIndex(nextIndex);
  };

  const footer = (
    <>
      <span className="ac-status ac-status-live">● STUDYING</span>
      <span className="ac-status">
        {corrects}✓ / {incorrects}✗
      </span>
      <span className="ac-status">
        {total ? `${index + 1} / ${total}` : `#${index + 1}`}
      </span>
    </>
  );

  return (
    <AppCard title="hex_flash_card" footer={footer} onBack={onBack}>
      <HexBinaryCard
        key={index}
        card={card}
        onCorrect={() => handleAnswer(true)}
        onIncorrect={() => handleAnswer(false)}
      />
    </AppCard>
  );
};

export default FlashCardSession;
