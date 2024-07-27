import { useState } from 'react';
import Game from './components/Game/Game';
import Result from './components/Result/Result';
import './index.css';
import { questions } from './api/api';

function App() {
  const [step, setStep] = useState(0);
  const [correct, setcorrect] = useState(0);

  const question = questions[step];

  const onclickVariant = (index) => {
    setStep(step + 1);
    if (index === question.correct) {
      setcorrect(correct + 1);
    }
  };

  console.log(question);
  return (
    <div className="App">
      {step !== questions.length ? (
        <Game step={step} question={question} onclickVariant={onclickVariant} />
      ) : (
        <Result step={step} correct={correct} />
      )}
    </div>
  );
}

export default App;
