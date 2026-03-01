import type { FlashCardConfig } from "../FlashCardConfig";
import { FlashCardType } from "../FlashCardType";
import type { FlashCard } from "./FlashCard";
import type { FlashCardFactory } from "./FlashCardFactory";
import HexFlashCard from "./HexFlashCard";
import BinaryFlashCard from "./BinaryFlashCard";
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
