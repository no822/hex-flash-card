export const StudyMode = {
  NORMAL: "NORMAL",
  INFINITY: "INFINITY",
} as const;

export type StudyMode = (typeof StudyMode)[keyof typeof StudyMode];
