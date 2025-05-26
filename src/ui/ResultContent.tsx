'use client';

import quizContext from "@/context/quizContext";
import userContext from "@/context/userContext";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function ResultContent({ answers }: { answers: number[] }) {
    const { quiz, removeQuiz } = useContext(quizContext);
    const { user, removeUser } = useContext(userContext);

    if (!quiz || quiz.length === 0 || !user) {
        return <div className="flex justify-center items-center w-full text-white">Quiz data not found. Please retake the quiz.</div>
    }

    let idx = 0;
    const correctAnswers = quiz.map(item => {
        const isCorrect = item.options[item.answer] === item.options[answers[idx]];
        idx++;
        return isCorrect;
    });

    const answered = answers.filter(a => a !== null);
    const totalCorrect = correctAnswers.filter(Boolean).length;
    const scorePercentage = Math.round((totalCorrect / quiz.length) * 100);

    const handleTryAgain = () => {
        localStorage.removeItem('answers');
        removeQuiz();
        return redirect('/quiz');
    }

    const handleLogout = () => {
        localStorage.removeItem('answers');
        removeQuiz();
        removeUser();
        return redirect('/');
    }

    return (
        <main className="flex justify-center items-center w-full">
            <div className="flex flex-col w-2/5 bg-black/40 border border-slate-700 rounded-md divide-y-slate-700">
                <h1 className="w-full text-center text-white text-xl py-6 border-b border-slate-700">Quiz Results</h1>
                <div className="flex flex-col gap-y-4 items-center py-8 px-6">
                    <p>Nice effort, {user}</p>
                    <p className="text-2xl text-green-500 font-semibold">{scorePercentage}%</p>

                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="w-full flex justify-between items-center">
                            <p className="text-white text-sm">Correct Answers</p>
                            <p>{totalCorrect}/{quiz.length}</p>
                        </div>
                        <div className="w-full grid grid-cols-10 gap-1">
                            {correctAnswers.map((isCorrect, idx) => (
                                <div key={idx} className={`py-2 rounded-md border ${isCorrect ? 'bg-green-600' : 'bg-red-600'} border-slate-700`}></div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="w-full flex justify-between items-center">
                            <p className="text-white text-sm">Questions Answered</p>
                            <p>{answered.length}/{quiz.length}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2 w-full">
                        <button onClick={handleTryAgain} className="w-full py-2 rounded-md bg-blue-800 cursor-pointer text-white hover:bg-blue-600 duration-300">Try Again</button>
                        <button onClick={handleLogout} className="w-full py-2 rounded-md bg-black/20 border border-slate-700 cursor-pointer text-white hover:bg-white/30 duration-300">Logout</button>
                    </div>
                </div>
            </div>
        </main>
    );
}