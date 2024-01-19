import { ThemeToggle } from "./theme/theme-toggle";

export function Controls() {
  return (
    <div className="flex items-center shadow-inner bg-zinc-600/40 p-2 rounded-lg mt-auto">
      <ThemeToggle />
    </div>
  )
}