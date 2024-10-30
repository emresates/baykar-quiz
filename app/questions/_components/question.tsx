import React from "react";

type QuestionProps = {
  currentQuestion: number;
  question: string;
  questionLength: number;
  selectedOption: string | null;
  countDown: number;
  onClick: (option: string) => void;
  disableTimer: boolean;
};

const Question = ({
  currentQuestion,
  question,
  questionLength,
  selectedOption,
  countDown,
  onClick,
  disableTimer,
}: QuestionProps) => {
  return (
    <div>
      <h1 className="py-4 text-lg font-light">
        Question
        <span className="font-bold mx-1">{currentQuestion}</span>
        of
        <span className="font-bold mx-1">{questionLength}</span>
      </h1>
      <p className="text-center">{question}</p>
      <div className="flex items-center justify-between w-full gap-4 mt-5">
        {["A", "B", "C", "D"].map((option) => (
          <div
            key={option}
            className={`${
              countDown > 20
                ? "cursor-not-allowed bg-gray-400 text-white"
                : selectedOption === option
                ? "bg-white text-blue-600"
                : "bg-transparent text-white border-white shadow-sm shadow-white"
            } border rounded-md p-2 w-full cursor-pointer transition-all text-center select-none`}
            onClick={() =>
              countDown > 20 && !disableTimer ? null : onClick(option)
            }
          >
            <p>Option {option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
