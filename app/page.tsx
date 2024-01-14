import { Footer } from "@/components/Footer";
import { Article } from "@/components/article";
import { Timer } from "@/components/timer";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="bg-red-400 p-16 w-full flex justify-center">
        <div className="max-w-5xl min-h-screen">
          <div className="flex items-center justify-center mb-20">
            <h1 className="text-2xl text-white font-bold xs:text-5xl select-none">Pomo-Pomodoro</h1>
          </div>

          <Timer />
        </div>
      </div>

      <Article />

      <Footer />
    </main>
  )
}
