import Link from "next/link";
import React from "react";

type TableProps = {
  data: { questionId: number; answer: string }[];
  handleRestart: () => void;
};

const Table = ({ data, handleRestart }: TableProps) => {
  return (
    <div>
      <h1 className="text-center">Congratulations! You have completed</h1>
      <div className="flex flex-col items-center justify-center mt-4">
        <table className="border-collapse p-4">
          <thead className="p-4">
            <tr className="bg-green-400 text-white border">
              <th className="p-4 border-r">Question ID</th>
              <th className="p-4">Answer</th>
            </tr>
          </thead>
          <tbody>
            {data.map((answer, index) => (
              <tr key={index} className="hover:bg-gray-700 transition-all">
                <td className="px-4 py-1 border">{answer.questionId + 1}</td>
                <td className="px-4 py-1 border">{answer.answer || "NA *"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm mt-2">*NA: Not Answered</p>
        <Link
          className="mt-8 text-center bg-white text-blue-600 p-2 rounded-md w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600"
          href="/"
        >
          Return Home
        </Link>
        <button
          className="mt-2 text-center bg-blue-600 text-white p-2 rounded-md w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600"
          onClick={handleRestart}
        >
          Restart with the same options
        </button>
      </div>
    </div>
  );
};

export default Table;
