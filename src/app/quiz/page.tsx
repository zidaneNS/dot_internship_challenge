'use client';

import { QuizProvider } from "@/context/quizContext";
import QuizContent from "@/ui/QuizContent";

export default function Page() {
    return (
        <QuizProvider>
            <QuizContent />
        </QuizProvider>
    )
}