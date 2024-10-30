import { Fetcher } from "@/lib/fetcher";
import React from "react";
import QuestionsContent, { DataType } from "./content";

const QuestionsPage = async ({
  searchParams,
}: {
  searchParams: { disableTimer: boolean };
}) => {
  const [questions] = await Promise.all([
    Fetcher({ fetchType: "questions", fetchName: "posts" }) as Promise<
      DataType[]
    >,
  ]);

  const { disableTimer } = await searchParams;

  return (
    <div className="w-screen h-screen">
      <QuestionsContent data={questions} disableTimer={disableTimer} />
    </div>
  );
};

export default QuestionsPage;
