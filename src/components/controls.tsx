import { EditBackground } from "./editBackground";
import { EditTimer } from "./editTimer";
import { ThemeToggle } from "./theme/theme-toggle";

export function Controls() {
  return (
    <div className="flex justify-center items-center mt-auto">
      <div className="flex justify-center gap-1.5 w-fit shadow-inner bg-zinc-600/40 p-2 rounded-lg">
        <EditTimer />
        <EditBackground />

        <ThemeToggle />

      </div>
    </div>
  )
}