'use client';

import userContext from "@/context/userContext";
import { LoginFormSchema } from "@/lib/definition";
import { LoginFormState } from "@/lib/type";
import { redirect } from "next/navigation";
import { useActionState, useContext } from "react";

export default function LoginForm() {
    const { storeUser } = useContext(userContext);
    const login = (state: LoginFormState, formData: FormData) => {
        const validatedField = LoginFormSchema.safeParse({
            user: formData.get('user')
        });

        if (!validatedField.success) {
            return { errors: validatedField.error.flatten().fieldErrors }
        }

        const { user } = validatedField.data;
        
        storeUser(user);

        return redirect('/quiz');
    }
    
    const [state, action, pending] = useActionState(login, undefined);

    return (
        <form action={action} className="z-10 w-full py-8 px-6 rounded-md bg-black/50 border border-slate-700 shadow-xl flex flex-col gap-y-4 items-center md:w-1/3">
            <h1 className="text-2xl font-bold text-white">Quiz Login</h1>
            <input type="text" name="user" required autoFocus placeholder="Enter your name" className="bg-black/20 w-full px-3 py-2 border border-slate-700 rounded-md" />
            {state?.errors.user && <div className="py-2 px-4 rounded-md bg-white/20 text-red-500 text-sm">{state.errors.user}</div>}
            {pending ? (
                <div className="w-full text-center">Loading...</div>
            ) : (
                <button className="w-full text-center bg-blue-800 text-white hover:bg-blue-700 duration-300 cursor-pointer py-2 rounded-md">Start Quiz</button>
            )}
        </form>
    )
}