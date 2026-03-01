import type { FlashCardConfig } from "../FlashCardConfig";
import { FlashCardType } from "../FlashCardType";
import { StudyMode } from "../StudyMode";
import type { FlashCard } from "./FlashCard";

class FallbackFlashCard implements FlashCard {
  config: FlashCardConfig;

  binary: string = "";
  hex: string = "";
  currentValue: string = "[ERROR] Invalid Flash Card";

  constructor() {
    this.config = {
      type: FlashCardType.BINARY,
      mode: StudyMode.NORMAL,
    };
  }

  showAnswer(): void {}

  hideAnswer(): void {}
}

export default FallbackFlashCard;
