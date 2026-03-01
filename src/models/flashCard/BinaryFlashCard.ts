import type { FlashCardConfig } from "../FlashCardConfig";
import type { FlashCard } from "./FlashCard";
import type { HexBinaryConverter } from "../../utils/HexBinaryConverter";
import DefaultHexBinaryConverter from "../../utils/DefaultHexBinaryConverter";

class BinaryFlashCard implements FlashCard {
  converter: HexBinaryConverter = new DefaultHexBinaryConverter();
  config: FlashCardConfig;

  binary: string = "";
  hex: string = "";
  currentValue: string = "";

  constructor(config: FlashCardConfig, value: string) {
    this.config = config;

    this.binary = this.converter.toBinary(value);
    this.hex = this.converter.toHex(value);
    this.currentValue = this.binary;
  }

  showAnswer(): void {
    this.currentValue = this.hex;
  }

  hideAnswer(): void {
    this.currentValue = this.binary;
  }
}

export default BinaryFlashCard;
