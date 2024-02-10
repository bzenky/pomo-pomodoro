'use client'

import { useStore } from "@/store";
import ReactAudioPlayer from "react-audio-player";

export function BackgroundSound() {
  const { backgroundType, soundsVolume } = useStore()

  return (
    <>
      {backgroundType === "rainy" && soundsVolume.rain.volume > 0 && (
        <ReactAudioPlayer
          src="/assets/sounds/rain.mp3"
          loop
          volume={soundsVolume.rain.volume}
          autoPlay
        />
      )}

      {backgroundType === "sea" && soundsVolume.seaWaves.volume > 0 && (
        <ReactAudioPlayer
          src="/assets/sounds/sea-waves.mp3"
          loop
          volume={soundsVolume.seaWaves.volume}
          autoPlay
        />
      )}

      {backgroundType === "keyboard" && soundsVolume.keyboard.volume > 0 && (
        <ReactAudioPlayer
          src="/assets/sounds/keyboard.mp3"
          loop
          volume={soundsVolume.keyboard.volume}
          autoPlay
        />
      )}
    </>
  )
}
