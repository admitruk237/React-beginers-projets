import { questions } from '../../api/api';

function Game({ step, question, onclickVariant }) {
  const procentage = Math.round((step / questions.length) * 100);
  console.log(procentage);

  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${procentage}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((answer, index) => {
          return (
            <li onClick={() => onclickVariant(index)} key={index}>
              {answer}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Game;
