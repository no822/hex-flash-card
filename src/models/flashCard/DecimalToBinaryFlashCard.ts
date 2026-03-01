import type { FlashCardConfig } from "../FlashCardConfig";
import type { FlashCard } from "./FlashCard";

class DecimalToBinaryFlashCard implements FlashCard {
  config: FlashCardConfig;

  decimal: string = "";
  binary: string = "";
  hex: string = "";
  currentValue: string = "";

  constructor(config: FlashCardConfig, value: string) {
    this.config = config;

    const num = parseInt(value, 10);
    this.decimal = value;
    this.binary = num.toString(2);
    this.hex = num.toString(16).toUpperCase();
    this.currentValue = this.decimal;
  }

  showAnswer(): void {
    this.currentValue = this.binary;
  }

  hideAnswer(): void {
    this.currentValue = this.decimal;
  }
}

export default DecimalToBinaryFlashCard;
