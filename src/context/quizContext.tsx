'use client';

import { shuffleArray } from "@/lib/action";
import { FetchQuiz, Quiz } from "@/lib/type";
import { createContext, useEffect, useState } from "react";

export type QuizContext = {
    quiz: Quiz[]
}

const initContext: QuizContext = {
    quiz: []
}

const quizContext = createContext<QuizContext>(initContext);

export default quizContext;

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [quiz, setQuiz] = useState<Quiz[]>([]);
    
    useEffect(() => {     
        const getQuiz = async () => {
            const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple", {
                method: "GET"
            });
            
            if (response.status === 200) {
                const data = await response.json();
                const rawQuiz: FetchQuiz[] = data.results || [];
                
                const filteredQuiz: Quiz[] = rawQuiz.map(item => {
                    const question = item.question;
                    const options: string[] = [];
                    options.push(item.correct_answer);
                    item.incorrect_answers.forEach(el => options.push(el));
                    
                    const shuffledOptions = shuffleArray(options);
                    
                    const answer = shuffledOptions.indexOf(item.correct_answer);
                    
                    return {
                        question,
                        options: shuffledOptions,
                        answer
                    }       
                });
                
                localStorage.setItem('quiz', JSON.stringify(filteredQuiz));
                setQuiz(filteredQuiz);
            }
        }
        
        const sttoredQuiz = localStorage.getItem("quiz");
        localStorage.setItem('answers', JSON.stringify([]));
        
        if (sttoredQuiz) {
            setQuiz(JSON.parse(sttoredQuiz));
        } else {
            getQuiz();
        }
    }, []);

    return <quizContext.Provider value={{ quiz }}>{children}</quizContext.Provider>
}