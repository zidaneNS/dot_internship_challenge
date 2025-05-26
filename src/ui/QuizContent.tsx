'use client';

import quizContext from "@/context/quizContext";
import { decodeHTMLEntities } from "@/lib/action";
import { Quiz } from "@/lib/type";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function QuizContent() {
    const { quiz } = useContext(quizContext);
    const router = useRouter();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        const storedAnswers = localStorage.getItem('answers');
        if (storedAnswers) {
            const parsedAnswers: (number | null)[] = JSON.parse(storedAnswers);
            setAnswers(parsedAnswers);
            const nextUnansweredIndex = parsedAnswers.findIndex(ans => ans === null);
            setCurrentQuestionIndex(nextUnansweredIndex === -1 ? parsedAnswers.length : nextUnansweredIndex);
        } else {
            const initialAnswers = Array(quiz.length).fill(null);
            setAnswers(initialAnswers);
            localStorage.setItem('answers', JSON.stringify(initialAnswers));
        }
    }, [quiz]);

    useEffect(() => {
        if (quiz.length > 0 && currentQuestionIndex < quiz.length) {
            setSelectedQuiz(quiz[currentQuestionIndex]);
        }
    }, [quiz, currentQuestionIndex]);

    const handleNext = () => {
        if (selectedAnswer !== null && selectedQuiz) {
            const updatedAnswers = [...answers];
            updatedAnswers[currentQuestionIndex] = selectedAnswer;
            setAnswers(updatedAnswers);
            localStorage.setItem('answers', JSON.stringify(updatedAnswers));
            
            setSelectedAnswer(null);
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handleFinish = () => {
        if (selectedAnswer !== null) {
            const updatedAnswers = [...answers];
            updatedAnswers[currentQuestionIndex] = selectedAnswer;
            setAnswers(updatedAnswers);
            localStorage.setItem('answers', JSON.stringify(updatedAnswers));
        }
        router.push('/result');
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const handleAutoFinish = () => {
            localStorage.setItem('answers', JSON.stringify(answers));
            router.push('/result');
        };

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleAutoFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [answers, router]);

    return selectedQuiz ? (
        <main className="flex flex-col items-center w-full md:px-64 py-10 h-full gap-y-8">
            <div className="flex justify-between w-full">
                <h2 className="text-2xl font-bold text-blue-400">Quiz Master</h2>
                <div className="flex flex-col items-center gap-y-2">
                    <p className="">Time Remaining</p>
                    <p className="text-center w-full text-xl">{formatTime(timeLeft)}</p>
                </div>
            </div>

            <div className="w-full flex flex-col gap-y-2">
                <div className="w-full flex justify-between text-white text-sm">
                    <p>Question {currentQuestionIndex + 1} of {quiz.length}</p>
                    <p>{Math.round(((currentQuestionIndex + 1) / quiz.length) * 100)}%</p>
                </div>
                <div className="grid grid-cols-10 w-full gap-2">
                    {answers.map((ans, idx) => (
                        <div key={idx} className={`py-2 rounded-md ${ans !== null ? "bg-blue-600" : "bg-black/40"} border border-slate-700`}></div>
                    ))}
                </div>
            </div>

            <div className="px-10 py-8 rounded-lg bg-black/40 border border-slate-700 w-full flex flex-col gap-y-4 text-white">
                <h3 className="text-xl">{decodeHTMLEntities(selectedQuiz.question)}</h3>
                <div className="w-full grid grid-rows-4 gap-4">
                    {selectedQuiz.options.map((option, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedAnswer(idx)}
                            className={`py-4 rounded-md px-6 cursor-pointer border border-slate-700 hover:bg-white/30 duration-300 ${
                                selectedAnswer === idx ? "bg-white/30" : "bg-black/40"
                            }`}
                        >
                            {decodeHTMLEntities(option)}
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full flex flex-row-reverse">
                {currentQuestionIndex === quiz.length - 1 ? (
                    <button
                        onClick={handleFinish}
                        className="bg-blue-800 text-white py-2 px-4 rounded-md w-fit cursor-pointer hover:bg-blue-600 duration-300"
                    >
                        Finish
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="bg-blue-800 text-white py-2 px-4 rounded-md w-fit cursor-pointer hover:bg-blue-600 duration-300"
                    >
                        Next
                    </button>
                )}
            </div>
        </main>
    ) : (
        <div className="flex justify-center items-center w-full">Loading....</div>
    );
}