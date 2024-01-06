'use client'

import { useEffect, useState } from "react";
import { secondsToMinutes } from "date-fns";
import useSound from 'use-sound';
import { Button } from "./ui/button";

export function Timer() {
  const [timer, setTimer] = useState(25 * 60)
  const [cycle, setCycle] = useState(1)
  const [isActive, setIsActive] = useState(false)
  const [playClockTick] = useSound("/assets/sounds/clock-tick.mp3")

  const pomodoro = (60 * 25)
  const shortBreak = (60 * 5)
  const longBreak = (60 * 15)

  function handleTimer() {
    setIsActive(active => !active)

    handleStart()
  }

  function resetTimer() {
    setIsActive(false)

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

  if (timer === 0) {
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
  }

  return (
    <div className="flex flex-col">
      <span className="text-center text-5xl font-semibold">
        {minutes}:{seconds}
      </span>

      <div className="flex gap-4 mt-8">
        <Button
          onClick={handleTimer}
          size="lg"
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>

        <Button
          onClick={resetTimer}
          size="lg"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}