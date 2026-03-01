import type { FlashCardConfig } from "../FlashCardConfig";
import { FlashCardType } from "../FlashCardType";
import type { FlashCard } from "./FlashCard";

class FallbackFlashCard implements FlashCard {
  config: FlashCardConfig;

  binary: string = "";
  hex: string = "";
  decimal: string = "";
  currentValue: string = "[ERROR] Invalid Flash Card";

  constructor() {
    this.config = {
      type: FlashCardType.BINARY,
    };
  }

  showAnswer(): void {}

  hideAnswer(): void {}
}

export default FallbackFlashCard;
