export const FlashCardType = {
  HEX: "HEX",
  BINARY: "BINARY",
  DECIMAL_TO_BINARY: "DECIMAL_TO_BINARY",
  BINARY_TO_DECIMAL: "BINARY_TO_DECIMAL",
} as const;

export type FlashCardType = (typeof FlashCardType)[keyof typeof FlashCardType];
