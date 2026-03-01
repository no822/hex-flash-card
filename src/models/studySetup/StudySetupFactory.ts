import type { FlashCardType } from "../FlashCardType";
import type { StudySetup } from "./StudySetup";

export interface StudySetupFactory {
  createDefaultSetup(): StudySetup;
  createSetupBy(type: FlashCardType): StudySetup;
}
