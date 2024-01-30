'use client'

import ReactPlayer from 'react-player'
import { useStore } from "@/store"

export function Background() {
  const { backgroundType } = useStore()

  const url = `/assets/videos/${backgroundType}.mp4`

  if (backgroundType === 'default') return (
    <div className="bg-red-400 dark:bg-zinc-900 absolute inset-0 -z-10" />
  )

  return (
    <div className="absolute inset-0 -z-10 bg-red-400 dark:bg-zinc-900 opacity-90 overflow-hidden">
      <ReactPlayer
        url={url}
        playing
        loop
        muted
        className="videoBackgroundPlayer"
        width="inherit"
        height="125%"
      />
    </div>
  )
}