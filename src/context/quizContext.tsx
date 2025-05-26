'use client';

import { shuffleArray } from "@/lib/action";
import { FetchQuiz, Quiz } from "@/lib/type";
import { createContext, useEffect, useState } from "react";

export type QuizContext = {
    quiz: Quiz[],
    removeQuiz: () => void
};

const initContext: QuizContext = {
    quiz: [],
    removeQuiz: () => {}
};

const quizContext = createContext<QuizContext>(initContext);

export default quizContext;

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [quiz, setQuiz] = useState<Quiz[]>([]);

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple");
                if (!response.ok) throw new Error("Fetch failed");

                const data = await response.json();
                const rawQuiz: FetchQuiz[] = data.results || [];

                const filteredQuiz: Quiz[] = rawQuiz.map(item => {
                    const question = item.question;
                    const options = shuffleArray([item.correct_answer, ...item.incorrect_answers]);
                    const answer = options.indexOf(item.correct_answer);

                    return { question, options, answer };
                });

                localStorage.setItem("quiz", JSON.stringify(filteredQuiz));
                localStorage.setItem("answers", JSON.stringify(Array(filteredQuiz.length).fill(null)));

                setQuiz(filteredQuiz);
            } catch (err) {
                console.error("Failed to fetch quiz:", err);
            }
        };

        const storedQuiz = typeof window !== "undefined" ? localStorage.getItem("quiz") : null;

        if (storedQuiz) {
            try {
                setQuiz(JSON.parse(storedQuiz));
            } catch (err) {
                console.error("Failed to parse stored quiz:", err);
                getQuiz();
            }
        } else {
            getQuiz();
        }
    }, []);

    const removeQuiz = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("quiz");
        }
        setQuiz([]);
    };

    return (
        <quizContext.Provider value={{ quiz, removeQuiz }}>
            {children}
        </quizContext.Provider>
    );
}