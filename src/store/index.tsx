import { create } from "zustand"
import { defaultTimes } from "@/utils/constants"

export type CycleProps = 'pomodoro' | 'shortBreak' | 'longBreak'

interface EditTimerProps {
  pomodoroTimer: number
  shortBreakTimer: number
  longBreakTimer: number
}

interface StoreProps {
  timer: number
  cycle: number
  cycleType: CycleProps
  isDefaultTimer: boolean
  isActive: boolean
  pomodoroTimer: number
  shortBreakTimer: number
  longBreakTimer: number
  updateTimer: () => void
  updateCycle: () => void
  editTimer: ({ pomodoroTimer, shortBreakTimer, longBreakTimer }: EditTimerProps) => void
}

export const useStore = create<StoreProps>((set, get) => {
  return {
    timer: defaultTimes.pomodoro,
    cycle: 1,
    cycleType: 'pomodoro',
    isDefaultTimer: true,
    isActive: false,
    pomodoroTimer: defaultTimes.pomodoro,
    shortBreakTimer: defaultTimes.shortBreak,
    longBreakTimer: defaultTimes.longBreak,
    updateTimer: () => set((state) => ({ timer: state.timer - 1 })),
    updateCycle: () => set((state) => ({ cycle: state.cycle + 1 })),
    editTimer: ({ pomodoroTimer, shortBreakTimer, longBreakTimer }: EditTimerProps) => {
      set({
        timer: pomodoroTimer * 60,
        cycle: 1,
        pomodoroTimer: pomodoroTimer * 60,
        shortBreakTimer: shortBreakTimer * 60,
        longBreakTimer: longBreakTimer * 60,
        isDefaultTimer: false,
        isActive: false,
      })
    }
  }
})