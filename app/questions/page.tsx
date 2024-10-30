import { Fetcher } from "@/lib/fetcher";
import React, { Suspense } from "react";
import QuestionsContent, { DataType } from "./content";

const QuestionsPage = async () => {
  const [questions] = await Promise.all([
    Fetcher({ fetchType: "questions", fetchName: "posts" }) as Promise<
      DataType[]
    >,
  ]);

  return (
    <div className="w-screen h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <QuestionsContent data={questions} />
      </Suspense>
    </div>
  );
};

export default QuestionsPage;
