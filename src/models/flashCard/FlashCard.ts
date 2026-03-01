import type { FlashCardConfig } from "../FlashCardConfig";

export interface FlashCard {
  config: FlashCardConfig;

  binary: string;
  hex: string;
  currentValue: string;

  showAnswer(): void;
  hideAnswer(): void;
}
