import { Timer } from "@/components/timer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-16 bg-red-400">
      <div className="max-w-5xl">
        <div className="flex items-center justify-center mb-20">
          <h1 className="text-2xl text-white font-bold xs:text-5xl">Pomo-Pomodoro</h1>
        </div>

        <Timer />
      </div>
    </main>
  )
}
