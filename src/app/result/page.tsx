'use client';

import { QuizProvider } from "@/context/quizContext";
import ResultContent from "@/ui/ResultContent";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [answers, setAnswers] = useState<number[] | null>(null);

    useEffect(() => {
        const storedAnswers = localStorage.getItem('answers');

        if (storedAnswers) {
            setAnswers(JSON.parse(storedAnswers));
        } else {
            return redirect('/quiz');
        }
    }, []);

    return answers ? (
        <QuizProvider>
            <ResultContent answers={answers} />
        </QuizProvider>
    ) : (
        <div className="flex justify-center items-center w-full">Loading...</div>
    )
}