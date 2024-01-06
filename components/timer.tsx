'use client'

import { useEffect, useState } from "react";
import { secondsToMinutes } from "date-fns";
import useSound from 'use-sound';
import { SkipForward } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function Timer() {
  const [timer, setTimer] = useState(25 * 60)
  const [cycle, setCycle] = useState(1)
  const [isActive, setIsActive] = useState(false)
  const [playClockTick] = useSound("/assets/sounds/clock-tick.mp3")
  const [playCycleEnd] = useSound("/assets/sounds/end-cycle.mp3")
  const [playReset] = useSound("/assets/sounds/mouse-click.mp3", { volume: 0.35 })

  const pomodoro = (60 * 25)
  const shortBreak = (60 * 5)
  const longBreak = (60 * 15)

  function handleTimer() {
    setIsActive(active => !active)

    handleStart()
  }

  function resetTimer() {
    setIsActive(false)
    playReset()

    if (cycle % 2 === 0) {
      if (cycle === 8) {
        setTimer(longBreak)
      } else {
        setTimer(shortBreak)
      }
    } else {
      setTimer(pomodoro)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive])

  const minutes = secondsToMinutes(timer)
  const secondsCalc = timer - (minutes * 60)
  const seconds = String(secondsCalc).padStart(2, '0')

  function handleStart() {
    if (isActive) return

    playClockTick()
  }

  function handleCycle() {
    if (cycle % 2 === 0) {
      if (cycle === 8) {
        setCycle(1)
      } else {
        setCycle(cycle => cycle + 1)
      }
      setTimer(pomodoro)
    } else if (cycle === 7) {
      setTimer(longBreak)
      setCycle(cycle => cycle + 1)
    } else {
      setCycle(cycle => cycle + 1)
      setTimer(shortBreak)
    }

    setIsActive(false)
    playCycleEnd()
  }

  if (timer === 0) handleCycle()

  return (
    <div className="flex flex-col">
      <span className="text-center text-5xl font-semibold">
        {minutes}:{seconds}
      </span>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          onClick={handleTimer}
          size="lg"
          className="bg-lime-700 hover:bg-lime-800 active:hover:bg-lime-900 shadow-sm"
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>

        <Button
          onClick={resetTimer}
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 active:hover:bg-amber-700 shadow-sm"
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
                    className="text-red-700"
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