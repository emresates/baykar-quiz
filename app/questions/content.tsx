"use client";
import React, { useEffect, useState } from "react";
import Table from "./_components/table";
import Question from "./_components/question";
import { useSearchParams } from "next/navigation";

export type DataType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type QuestionsContentProps = {
  data: DataType[];
};

const QuestionsContent = ({ data }: QuestionsContentProps) => {
  const disableTimer = useSearchParams().get("disableTimer") === "true";

  const [answers, setAnswers] = useState<
    { questionId: number; answer: string }[]
  >([]);

  const seconds = disableTimer ? 0 : 30;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [countDown, setCountDown] = useState(seconds);
  const [isFinished, setIsFinished] = useState(false);

  const firstTenQuestions = data.slice(0, 10);

  useEffect(() => {
    if (!disableTimer) {
      if (countDown > 0 && !isFinished) {
        const timer = setInterval(
          () => setCountDown((prevCountDown) => prevCountDown - 1),
          1000
        );
        return () => clearInterval(timer);
      } else if (!isFinished) {
        saveAnswer();
        nextQuestion();
        if (currentQuestion === firstTenQuestions.length - 1) {
          setIsFinished(true);
        }
      }
    }
  }, [countDown, isFinished]);

  const saveAnswer = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: currentQuestion, answer: selectedOption || "" },
    ]);
    setSelectedOption(null);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setCountDown(seconds);
  };

  const handleNextQuestion = () => {
    saveAnswer();
    if (currentQuestion < firstTenQuestions.length - 1) {
      nextQuestion();
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsFinished(false);
    setCountDown(seconds);
  };

  return (
    <div className="flex items-center justify-center flex-col h-full w-full relative">
      {!disableTimer && !isFinished && (
        <div
          className={`${
            countDown > 20 ? "bg-orange-500" : "bg-white"
          } h-14 w-14 rounded-full flex items-center justify-center absolute top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2`}
        >
          <div
            className={`${
              countDown > 20 ? "text-orange-500" : "text-white"
            } h-12 w-12 rounded-full bg-black flex font-semibold items-center justify-center`}
          >
            {countDown}
          </div>
        </div>
      )}

      {!isFinished ? (
        <div className="w-1/2 px-2">
          <Question
            currentQuestion={currentQuestion + 1}
            question={firstTenQuestions[currentQuestion]?.body}
            questionLength={firstTenQuestions.length}
            selectedOption={selectedOption}
            countDown={countDown}
            onClick={setSelectedOption}
            disableTimer={disableTimer}
          />

          <button
            onClick={handleNextQuestion}
            disabled={disableTimer ? false : selectedOption === null}
            className="mt-8 bg-blue-600 text-white p-2 rounded-md w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            {currentQuestion === firstTenQuestions.length - 1
              ? "Finish"
              : "Next Question"}
          </button>
        </div>
      ) : (
        <Table data={answers} handleRestart={handleRestart} />
      )}
    </div>
  );
};

export default QuestionsContent;
