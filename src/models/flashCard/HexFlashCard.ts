import type { FlashCardConfig } from "../FlashCardConfig";
import type { FlashCard } from "./FlashCard";
import type { HexBinaryConverter } from "../../utils/HexBinaryConverter";
import DefaultHexBinaryConverter from "../../utils/DefaultHexBinaryConverter";

class HexFlashCard implements FlashCard {
  private converter: HexBinaryConverter = new DefaultHexBinaryConverter();
  config: FlashCardConfig;

  binary: string = "";
  hex: string = "";
  decimal: string = "";
  currentValue: string = "";

  constructor(config: FlashCardConfig, value: string) {
    this.config = config;

    this.hex = value.toUpperCase();
    this.binary = this.converter.toBinary(value);
    this.decimal = parseInt(value, 16).toString(10);
    this.currentValue = this.hex;
  }

  showAnswer(): void {
    this.currentValue = this.binary;
  }

  hideAnswer(): void {
    this.currentValue = this.hex;
  }
}

export default HexFlashCard;
