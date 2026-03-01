export const FlashCardType = {
  HEX: "HEX",
  BINARY: "BINARY",
} as const;

export type FlashCardType = (typeof FlashCardType)[keyof typeof FlashCardType];
