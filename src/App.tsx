import { useState } from "react";
import FlashCardSetup from "./components/FlashCardSetup";
import type { StudySetup } from "./models/studySetup/StudySetup";

import "./App.css";

/**
 * - 2진수 <--> 16진수 변환 연습 플래시카드
 */
function App() {
  const [isInit, setIsInit] = useState(false);

  const handleSetupSubmit = (setup: StudySetup) => {
    console.log("Study session started:", setup);
    // setup 기반으로 Card 생성
    // setup.mode === StudyMode.INFINITY이면 다음 누를 때마다 다음 카드 생성
    // setup.mode === StudyMode.NORMAL이면 정해진 갯수만큼 카드 생성
    setIsInit(true);
  };

  return (
    <>
      {!isInit && <FlashCardSetup onSubmit={handleSetupSubmit} />}
      {isInit && <div>card</div>}
    </>
  );
}

export default App;
