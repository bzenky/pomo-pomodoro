import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <div className="flex flex-col justify-center items-center p-3 bg-zinc-400 w-full select-none gap-1">
      <span className=" flex items-center gap-2">
        <Code2 className="w-4 h-4" /> by <a href="https://www.bzenky.dev" target="_blank" className="text-zinc-100 font-bold">Zenky</a>
      </span>

      <span className="text-zinc-200">
        © Pomo-Pomodoro
      </span>
    </div>
  )
}