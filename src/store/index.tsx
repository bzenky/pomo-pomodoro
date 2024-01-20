import { create } from "zustand"
import { defaultTimes } from "@/utils/constants"

interface StoreProps {
  timer: number
  cycle: number
  isDefaultTimer: boolean
  pomodoroTimer: number
  shortBreakTime: number
  longBreakTime: number
  updateTimer: () => void
  updateCycle: () => void
}

export const useStore = create<StoreProps>((set, get) => {
  return {
    timer: (25 * 60),
    cycle: 1,
    isDefaultTimer: true,
    pomodoroTimer: defaultTimes.pomodoro,
    shortBreakTime: defaultTimes.shortBreak,
    longBreakTime: defaultTimes.longBreak,
    updateTimer: () => set((state) => ({ timer: state.timer - 1 })),
    updateCycle: () => set((state) => ({ cycle: state.cycle + 1 })),
  }
})