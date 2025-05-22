export default function LoginForm() {
    return (
        <form className="z-10 w-full py-8 px-6 rounded-md bg-black/50 border border-slate-700 shadow-xl flex flex-col gap-y-4 items-center md:w-1/3">
            <h1 className="text-2xl font-bold text-white">Quiz Login</h1>
            <input type="text" required autoFocus placeholder="Enter your name" className="bg-black/20 w-full px-3 py-2 border border-slate-700 rounded-md" />
            <button className="w-full text-center bg-blue-800 text-white hover:bg-blue-700 duration-300 cursor-pointer py-2 rounded-md">Start Quiz</button>
        </form>
    )
}