export default function Page() {
    return (
        <main className="flex flex-col items-center w-full md:px-64 py-10 h-full gap-y-8">
            <div className="flex justify-between w-full">
                <h2 className="text-2xl font-bold text-blue-400">Quiz Master</h2>
                <div className="flex flex-col items-center gap-y-2">
                    <p className="">Time Remaining</p>
                    <p className="text-center w-full text-xl">05:00</p>
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-2">
                <div className="w-full flex justify-between text-white text-sm">
                    <p>Question 1 of 10</p>
                    <p>10%</p>
                </div>
                <div className="grid grid-cols-10 w-full gap-2">
                {Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className="py-2 rounded-md bg-black/40 border border-slate-700"></div>
                ))}
                </div>
            </div>
            <div className="px-10 py-8 rounded-lg bg-black/40 border border-slate-700 w-full flex flex-col gap-y-4 text-white">
                <h3 className="text-xl">Question ?</h3>
                <div className="w-full grid grid-rows-4 gap-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="py-4 rounded-md bg-black/20 border border-slate-700 px-6 cursor-pointer hover:bg-white/30 duration-300">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, libero?</div>
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-between items-center">
                <button className="bg-blue-800 text-white py-2 px-4 rounded-md w-fit cursor-pointer hover:bg-blue-600 duration-300">Prev</button>
                <button className="bg-blue-800 text-white py-2 px-4 rounded-md w-fit cursor-pointer hover:bg-blue-600 duration-300">Next</button>
            </div>
        </main>
    )
}