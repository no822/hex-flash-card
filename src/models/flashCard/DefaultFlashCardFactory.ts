import type { FlashCardConfig } from "../FlashCardConfig";
import { FlashCardType } from "../FlashCardType";
import type { FlashCard } from "./FlashCard";
import type { FlashCardFactory } from "./FlashCardFactory";
import HexFlashCard from "./HexFlashCard";
import BinaryFlashCard from "./BinaryFlashCard";
import DecimalToBinaryFlashCard from "./DecimalToBinaryFlashCard";
import BinaryToDecimalFlashCard from "./BinaryToDecimalFlashCard";
import FallbackFlashCard from "./FallbackFlashCard";

class DefaultFlashCardFactory implements FlashCardFactory {
  private config: FlashCardConfig;

  constructor(config: FlashCardConfig) {
    this.config = config;
  }

  create(value: string): FlashCard {
    try {
      this.validate(value);

      if (this.config.type === FlashCardType.BINARY) {
        return new BinaryFlashCard(this.config, value);
      } else if (this.config.type === FlashCardType.DECIMAL_TO_BINARY) {
        return new DecimalToBinaryFlashCard(this.config, value);
      } else if (this.config.type === FlashCardType.BINARY_TO_DECIMAL) {
        return new BinaryToDecimalFlashCard(this.config, value);
      } else {
        return new HexFlashCard(this.config, value);
      }
    } catch (e) {
      return new FallbackFlashCard();
    }
  }

  private validate(value: string): void {
    if (value.length === 0) {
      throw new Error("There is no card contents");
    }
  }
}

export default DefaultFlashCardFactory;
