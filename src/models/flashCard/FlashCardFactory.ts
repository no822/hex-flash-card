import type { FlashCard } from "./FlashCard";

export interface FlashCardFactory {
  create(value: string): FlashCard;
}
