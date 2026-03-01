import type { Difficulty } from "../Difficulty";
import type { FlashCardType } from "../FlashCardType";
import type { StudyMode } from "../StudyMode";

export interface StudySetup {
  mode: StudyMode;
  numberOfCards: number;
  type: FlashCardType;
  difficulty: Difficulty;
}
