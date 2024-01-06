'use client'

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { secondsToMinutes } from "date-fns";

export function Timer() {
  const [timer, setTimer] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)

  function handleTimer() {
    setIsActive(active => !active)
  }

  function resetTimer() {
    setIsActive(false)
    setTimer(25 * 60)
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

  return (
    <div className="flex flex-col">
      <span className="text-center text-5xl font-semibold">
        {minutes}:{seconds}
      </span>

      <div className="flex gap-4 mt-8">
        <Button onClick={handleTimer} size="lg">
          {
            isActive ? 'Pause' : 'Start'
          }
        </Button>

        <Button onClick={resetTimer} size="lg">
          Reset
        </Button>
      </div>
    </div>
  )
}