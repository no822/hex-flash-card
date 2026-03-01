import { Difficulty } from "../Difficulty";
import { FlashCardType } from "../FlashCardType";
import type { FlashCardType as FlashCardTypeT } from "../FlashCardType";
import { StudyMode } from "../StudyMode";
import type { StudySetup } from "./StudySetup";
import type { StudySetupFactory } from "./StudySetupFactory";

class DefaultStudySetupFactory implements StudySetupFactory {
  createDefaultSetup(): StudySetup {
    return {
      mode: StudyMode.NORMAL,
      numberOfCards: 10,
      type: FlashCardType.HEX,
      difficulty: Difficulty.MEDIUM,
    };
  }

  createSetupBy(type: FlashCardTypeT): StudySetup {
    return {
      mode: StudyMode.NORMAL,
      numberOfCards: 10,
      type,
      difficulty: Difficulty.MEDIUM,
    };
  }
}

export default DefaultStudySetupFactory;
