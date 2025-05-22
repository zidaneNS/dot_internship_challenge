export default function Page() {
    return (
        <main className="flex justify-center items-center w-full">
            <div className="flex flex-col w-2/5 bg-black/40 border border-slate-700 rounded-md divide-y-slate-700">
                <h1 className="w-full text-center text-white text-xl py-6 border-b border-slate-700">Quiz Results</h1>
                <div className="flex flex-col gap-y-4 items-center py-8 px-6">
                    <p>Nice effort, user</p>
                    <p className="text-2xl text-green-500 font-semibold">100%</p>
                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="w-full flex justify-between items-center">
                            <p className="text-white text-sm">Correct Answers</p>
                            <p>0/10</p>
                        </div>
                        <div className="w-full grid grid-cols-10 gap-1">
                            {Array.from({ length: 10 }).map((_, idx) => (
                                <div key={idx} className="py-2 rounded-md bg-black/40 border border-slate-700"></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="w-full flex justify-between items-center">
                            <p className="text-white text-sm">Questions Answered</p>
                            <p>0/10</p>
                        </div>
                        <div className="w-full grid grid-cols-10 gap-1">
                            {Array.from({ length: 10 }).map((_, idx) => (
                                <div key={idx} className="py-2 rounded-md bg-black/40 border border-slate-700"></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <button className="w-full py-2 rounded-md bg-blue-800 cursor-pointer text-white hover:bg-blue-600 duration-300">Try Again</button>
                        <button className="w-full py-2 rounded-md bg-black/20 border border-slate-700 cursor-pointer text-white hover:bg-white/30 duration-300">Logout</button>
                    </div>
                </div>
            </div>
        </main>
    )
}