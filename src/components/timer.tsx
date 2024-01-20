'use client'

import { useEffect, useState } from "react";
import { secondsToMinutes } from "date-fns";
import useSound from 'use-sound';
import { SkipForward } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Progress } from "./ui/progress";
import { useStore } from "@/store";
import { defaultTimes } from "@/utils/constants";

type CycleProp = 'pomodoro' | 'shortBreak' | 'longBreak'

export function Timer() {
  const {
    timer,
    cycle,
    updateTimer,
    updateCycle
  } = useStore()
  const [cycleType, setCycleType] = useState<CycleProp>('pomodoro')
  const [isActive, setIsActive] = useState(false)
  const [playClockTick] = useSound("/assets/sounds/clock-tick.mp3")
  const [playCycleEnd] = useSound("/assets/sounds/end-cycle.mp3")
  const [playMouseClick] = useSound("/assets/sounds/mouse-click.mp3", { volume: 0.35 })

  const minutes = secondsToMinutes(timer)
  const secondsCalc = timer - (minutes * 60)
  const seconds = String(secondsCalc).padStart(2, '0')
  const progress = (1 - (timer / defaultTimes[cycleType])) * 100

  function handleTimer() {
    setIsActive(active => !active)

    if (isActive) return

    playClockTick()
  }

  function handleReset() {
    setIsActive(false)
    playMouseClick()

    if (cycle % 2 === 0) {
      if (cycle === 8) {
        useStore.setState({ timer: defaultTimes.longBreak })
      } else {
        useStore.setState({ timer: defaultTimes.shortBreak })
      }
    } else {
      useStore.setState({ timer: defaultTimes.pomodoro })
    }
  }

  function handleCycleType(type: CycleProp) {
    if (type === 'pomodoro') {
      useStore.setState({
        cycle: 1,
        timer: defaultTimes.pomodoro
      })
      useStore.setState({ timer: defaultTimes.pomodoro })
    } else if (type === 'shortBreak') {
      useStore.setState({
        cycle: 2,
        timer: defaultTimes.shortBreak
      })
    } else {
      useStore.setState({
        cycle: 8,
        timer: defaultTimes.longBreak
      })
    }

    setCycleType(type)
    setIsActive(false)
    playMouseClick()
  }

  function handleCycle() {
    if (cycle % 2 === 0) {
      if (cycle === 8) {
        useStore.setState({ cycle: 1 })
      } else {

        updateCycle()
      }
      useStore.setState({ timer: defaultTimes.pomodoro })
      setCycleType('pomodoro')
    } else if (cycle === 7) {
      useStore.setState({ timer: defaultTimes.longBreak })
      updateCycle()
      setCycleType('longBreak')
    } else {
      useStore.setState({ timer: defaultTimes.shortBreak })
      updateCycle()
      setCycleType('shortBreak')
    }

    setIsActive(false)
    playCycleEnd()
  }

  if (timer === 0) handleCycle()

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        updateTimer()
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive])

  return (
    <div className="flex flex-col bg-sky-50/10 px-10 pb-10 pt-6 rounded">
      <div className="flex justify-between">
        <Button
          type="button"
          size="sm"
          className={`${(cycleType === 'pomodoro') && 'bg-red-700 text-white'} hover:bg-red-800 hover:text-white active:bg-red-900 font-semibold -colors`}
          variant="ghost"
          onClick={() => handleCycleType('pomodoro')}
        >
          pomodoro
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={`${(cycleType === 'shortBreak') && 'bg-red-700 text-white'} hover:bg-red-800 hover:text-white active:bg-red-900 font-semibold transition-colors`}
          onClick={() => handleCycleType('shortBreak')}
        >
          short break
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          className={`${(cycleType === 'longBreak') && 'bg-red-700 text-white'} hover:bg-red-800 active:bg-red-900 hover:text-white font-semibold transition-colors`}
          onClick={() => handleCycleType('longBreak')}
        >
          long break
        </Button>
      </div>

      <div className="flex justify-center flex-col mt-10 mb-10">
        <span className="text-center text-7xl font-semibold">
          {minutes}:{seconds}
        </span>

        <div className="mt-5 px-4">
          <Progress
            value={progress}
            className="bg-secondary/70 h-2 dark:bg-zinc-500"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={handleTimer}
          size="lg"
          className="bg-lime-700 hover:bg-lime-800 active:hover:bg-lime-900 shadow-sm dark:text-zinc-50"
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>

        <Button
          onClick={handleReset}
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 active:hover:bg-amber-700 shadow-sm dark:text-zinc-50"
        >
          Reset
        </Button>

        {isActive && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" onClick={handleCycle}>
                  <SkipForward
                    size={32}
                    className="text-red-700 hover:text-red-800 transition-colors"
                  />
                </button>
              </TooltipTrigger>

              <TooltipContent>
                <span>Finish current cycle and go to the next one</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  )
}