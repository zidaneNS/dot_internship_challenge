export type FetchQuestion = {
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export type Question = {
    question: string,
    options: string[],
    answer: number
}

export type LoginFormState = | {
    errors?: {
        user?: string[]
    },
    message?: string
} | undefined