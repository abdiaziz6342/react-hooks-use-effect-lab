import React, { useEffect, useRef, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const timeRemainingRef = useRef(10);

  useEffect(() => {
    let remaining = timeRemainingRef.current;
    let timeout;

    function tick() {
      if (remaining === 0) {
        timeRemainingRef.current = 10;
        setTimeRemaining(10);
        onAnswered(false);
      } else {
        remaining -= 1;
        timeRemainingRef.current = remaining;
        setTimeRemaining(remaining);
        timeout = setTimeout(tick, 1000);
      }
    }

    timeout = setTimeout(tick, 1000);

    return () => clearTimeout(timeout);
  }, [onAnswered, question.id]);

  function handleAnswer(isCorrect) {
    timeRemainingRef.current = 10;
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
