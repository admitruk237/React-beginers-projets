import { useEffect, useState } from 'react';
import { questions } from '../../api/api';

function Result({ correct, step }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (step === questions.length) {
      setShow(true);
    }
  }, [step]);

  return (
    <div className={`result ${show ? 'show' : ''}`}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
        alt="Result icon"
      />
      <h2>
        You guessed {correct} answers out of {questions.length}
      </h2>
      <a href="/">
        <button>Try again</button>
      </a>
    </div>
  );
}

export default Result;
