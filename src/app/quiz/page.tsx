'use client';

import { QuizProvider } from "@/context/quizContext";
import userContext from "@/context/userContext";
import QuizContent from "@/ui/QuizContent";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function Page() {
    const { user } = useContext(userContext);

    if (!user) {
        return redirect('/');
    }
    
    return (
        <QuizProvider>
            <QuizContent />
        </QuizProvider>
    )
}