import { Timer } from "@/components/timer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-red-400">
      <div className="max-w-5xl w-full flex items-center justify-center mb-20">
        <h1 className="text-6xl text-white font-bold">Pomo-Pomodoro</h1>
      </div>

      <Timer />
    </main>
  )
}
