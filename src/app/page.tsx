import { Footer } from "@/components/footer";
import { Article } from "@/components/article";
import { Timer } from "@/components/timer";
import { Controls } from "@/components/controls";
import { Background } from "@/components/background";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="p-8 xl:p-16 w-full flex justify-center min-h-screen relative z-[2]">
        <div className="max-w-5xl flex flex-col">
          <div className="flex items-center justify-center mb-20">
            <h1 className="text-3xl text-white font-bold xs:text-5xl select-none">Pomo-Pomodoro</h1>
          </div>

          <Timer />

          <Controls />
        </div>

        <Background />
      </div>


      <Article />

      <Footer />
    </main>
  )
}
