"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [disableTimer, setDisableTimer] = useState(false);

  return (
    <div className="flex flex-col items-center relative justify-center h-screen w-screen">
      <Image
        src="/bg.png"
        alt="logo"
        fill
        className="object-cover z-[-1] opacity-40"
      />
      <h1 className="text-8xl font-bold">Quiz App</h1>
      <div className="mt-5 text-center space-y-2 text-lg">
        <div>
          <p>
            You can disable the 10 seconds timer for the questions. This may be
            useful for ending the quiz quickly.
          </p>
          <div className="flex items-center gap-1 justify-center">
            <div
              onClick={() => setDisableTimer(!disableTimer)}
              className={`${
                disableTimer ? "bg-white" : "bg-transparent"
              } w-4 h-4 transition-all rounded-full border border-white flex items-center justify-center select-none`}
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <p
              onClick={() => setDisableTimer(!disableTimer)}
              className="select-none"
            >
              Disable 10 Seconds Timer
            </p>
          </div>
        </div>
      </div>

      <Link
        href={`/questions${disableTimer ? "?disableTimer=true" : ""}`}
        className="text-2xl mt-10 font-bold border px-3 py-1 rounded-md hover:bg-white hover:text-blue-600 transition-all shadow-lg shadow-white active:translate-y-1 active:shadow-none select-none"
      >
        Get Started
      </Link>
    </div>
  );
}
