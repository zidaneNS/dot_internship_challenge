import LoginForm from "@/components/LoginForm";

export default function Page() {
  return (
    <main className="flex flex-col gap-y-8 w-full items-center z-10 px-8">
      <div className="absolute inset-0 z-0">
        <span className="absolute z-0 top-32 right-1/4 w-24 h-24 rounded-full bg-purple-600 blur-3xl"></span>
        <span className="absolute z-0 bottom-1/5 left-1/4 w-48 h-48 rounded-full bg-blue-600/60 blur-3xl "></span>
      </div>
      <div className="flex flex-col gap-y-3 items-center z-10">
        <h1 className="text-3xl text-blue-500 font-bold">Quiz Master</h1>
        <p className="text-center">Test your knowledge with our fun quizzes</p>
      </div>
      <LoginForm />
    </main>
  )
}